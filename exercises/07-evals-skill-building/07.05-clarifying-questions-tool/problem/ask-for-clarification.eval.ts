import { google } from "@ai-sdk/google";
import { stepCountIs, type UIMessage } from "ai";
import { evalite } from "evalite";
import { wrapAISDKModel } from "evalite/ai-sdk";
import { createUIMessageFixture } from "#shared/create-ui-message-fixture.ts";
import { runAgent } from "./agent.ts";

// Type for question objects returned by the tool
type ClarificationQuestion = {
	question: string;
	field: string;
	inputType?: "select" | "text" | "date" | "number";
	options?: string[];
};

// Expected fields metadata for each test case
type ExpectedFields = {
	fields: string[]; // Fields that MUST be asked about
	selectFields: string[]; // Fields where options make sense
	textFields: string[]; // Fields that should be open-ended
};

// Input structure for each test case
type TestCaseInput = {
	messages: UIMessage[];
	expected: ExpectedFields;
};

const testCases: Array<{ input: TestCaseInput }> = [
	{
		input: {
			messages: createUIMessageFixture("Book a flight to Paris"),
			expected: {
				fields: ["from", "departDate"],
				selectFields: ["from"], // departure city is enumerable
				textFields: [], // dates could be date picker
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Send John an email"),
			expected: {
				fields: ["to", "subject", "body"],
				selectFields: [],
				textFields: ["to", "subject", "body"], // all open-ended
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Create an invoice for the client"),
			expected: {
				fields: ["clientName", "clientEmail", "items"],
				selectFields: [],
				textFields: ["clientName", "clientEmail"],
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Translate this text to French"),
			expected: {
				fields: ["text"], // target language is provided
				selectFields: [],
				textFields: ["text"], // the text to translate is open-ended
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("What's the weather today?"),
			expected: {
				fields: ["location"],
				selectFields: ["location"], // could suggest common cities
				textFields: [],
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Create a social media post"),
			expected: {
				fields: ["content", "platforms", "scheduledTime"],
				selectFields: ["platforms"], // platforms are enumerable
				textFields: ["content"], // post content is open-ended
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Remind me to do something"),
			expected: {
				fields: ["message", "dateTime"],
				selectFields: [],
				textFields: ["message"], // reminder content is open-ended
			},
		},
	},
	{
		input: {
			messages: createUIMessageFixture("Compress this file"),
			expected: {
				fields: ["sourcePath", "outputPath"],
				selectFields: ["format"], // format is enumerable
				textFields: ["sourcePath", "outputPath"], // paths are open-ended
			},
		},
	},
];

// Output type from the task
type TaskOutput = {
	toolCalls: Array<{
		toolName: string;
		input: { questions?: ClarificationQuestion[] };
	}>;
	text: string;
	expected: ExpectedFields;
};

evalite<TestCaseInput, TaskOutput>("Ask For Clarification Evaluation", {
	data: testCases,
	task: async ({ messages, expected }) => {
		const result = runAgent(
			wrapAISDKModel(google("gemini-2.5-flash")),
			messages,
			stepCountIs(1),
		);

		await result.consumeStream();

		const toolCalls = (await result.toolCalls).map((toolCall) => ({
			toolName: toolCall.toolName,
			input: toolCall.input as { questions?: ClarificationQuestion[] },
		}));

		return {
			toolCalls,
			text: await result.text,
			expected, // pass through for scorers
		};
	},
	scorers: [
		{
			name: "Called askForClarification",
			description: "The agent called the askForClarification tool",
			scorer: ({ output }) => {
				return output.toolCalls.some(
					(tc) => tc.toolName === "askForClarification",
				)
					? 1
					: 0;
			},
		},
		{
			name: "Covered expected fields",
			description:
				"The agent asked about all the critical missing fields",
			scorer: ({ output }) => {
				const clarificationCall = output.toolCalls.find(
					(tc) => tc.toolName === "askForClarification",
				);
				if (!clarificationCall) return 0;

				const questions = clarificationCall.input.questions ?? [];
				const askedFields = questions.map((q) => q.field.toLowerCase());
				const expectedFields = output.expected.fields.map((f: string) =>
					f.toLowerCase(),
				);

				// Calculate what percentage of expected fields were asked about
				const coveredCount = expectedFields.filter((f: string) =>
					askedFields.some(
						(asked) => asked.includes(f) || f.includes(asked),
					),
				).length;

				return coveredCount / expectedFields.length;
			},
		},
		{
			name: "Appropriate inputType usage",
			description:
				"Used 'text' for open-ended questions and 'select' with options for enumerable ones",
			scorer: ({ output }) => {
				const clarificationCall = output.toolCalls.find(
					(tc) => tc.toolName === "askForClarification",
				);
				if (!clarificationCall) return 0;

				const questions = clarificationCall.input.questions ?? [];
				if (questions.length === 0) return 0;

				const { textFields, selectFields } = output.expected;
				let correctCount = 0;
				let totalChecked = 0;

				for (const q of questions) {
					const fieldLower = q.field.toLowerCase();

					// Check if this is expected to be a text field
					const shouldBeText = textFields.some(
						(f: string) =>
							fieldLower.includes(f.toLowerCase()) ||
							f.toLowerCase().includes(fieldLower),
					);

					// Check if this is expected to be a select field
					const shouldBeSelect = selectFields.some(
						(f: string) =>
							fieldLower.includes(f.toLowerCase()) ||
							f.toLowerCase().includes(fieldLower),
					);

					if (shouldBeText) {
						totalChecked++;
						// Text fields should use inputType 'text' (or no options)
						if (
							q.inputType === "text" ||
							(!q.options || q.options.length === 0)
						) {
							correctCount++;
						}
					} else if (shouldBeSelect) {
						totalChecked++;
						// Select fields should have inputType 'select' and options
						if (
							(q.inputType === "select" || !q.inputType) &&
							q.options &&
							q.options.length > 0
						) {
							correctCount++;
						}
					}
				}

				return totalChecked > 0 ? correctCount / totalChecked : 1;
			},
		},
	],
});
