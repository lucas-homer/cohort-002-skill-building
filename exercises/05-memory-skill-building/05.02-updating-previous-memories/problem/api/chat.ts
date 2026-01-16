import { google } from "@ai-sdk/google";
import {
	convertToModelMessages,
	createUIMessageStream,
	createUIMessageStreamResponse,
	generateId,
	generateObject,
	streamText,
	type UIMessage,
} from "ai";
import { z } from "zod";
import {
	type DB,
	deleteMemory,
	loadMemories,
	saveMemories,
	updateMemory,
} from "./memory-persistence.ts";

export type MyMessage = UIMessage<unknown, {}>;

const formatMemory = (memory: DB.MemoryItem) => {
	return [
		`Memory: ${memory.memory}`,
		`ID: ${memory.id}`,
		`Created At: ${memory.createdAt}`,
	].join("\n");
};

export const POST = async (req: Request): Promise<Response> => {
	const body: { messages: MyMessage[] } = await req.json();
	const { messages } = body;

	const memories = await loadMemories();

	const memoriesText = memories.map(formatMemory).join("\n\n");
	const stream = createUIMessageStream<MyMessage>({
		execute: async ({ writer }) => {
			const result = streamText({
				model: google("gemini-2.5-flash-lite"),
				system: `You are a helpful assistant that can answer questions and help with tasks.

        The date is ${new Date().toISOString().split("T")[0]}.

        You have access to the following memories:

        <memories>
        ${memoriesText}
        </memories>
        `,
				messages: convertToModelMessages(messages),
			});

			writer.merge(result.toUIMessageStream());
		},
		onFinish: async (response) => {
			const allMessages = [...messages, ...response.messages];

			const memoriesResult = await generateObject({
				model: google("gemini-2.5-flash"),
				schema: z.object({
					// TODO: Define the schema for the updates. Updates should
					// be an array of objects with the following fields:
					// - id: The ID of the existing memory to update
					// - memory: The updated memory content
					updates: z.array(
						z.object({
							id: z
								.string()
								.describe("The ID of the existing memory to update"),
							memory: z.string().describe("The updated memory content"),
						}),
					),
					// TODO: Define the schema for the deletions. Deletions should
					// be an array of strings, each representing the ID of a memory
					// to delete
					deletions: z.array(
						z.string().describe("the ID of a memory to delete"),
					),
					// TODO: Define the schema for the additions. Additions should
					// be an array of strings, each representing a new memory to add
					additions: z.array(z.string().describe("a new memory to add")),
				}),
				system: `You are a memory extraction agent. Your task is to analyze the conversation history and manage permanent memories about the user.

        PERMANENT MEMORIES are facts about the user that:
        - Are unlikely to change over time (preferences, traits, characteristics)
        - Will remain relevant for weeks, months, or years
        - Include personal details, preferences, habits, or important information shared
        - Are NOT temporary or situational information

        EXAMPLES OF PERMANENT MEMORIES:
        - "User prefers dark mode interfaces"
        - "User works as a software engineer"
        - "User has a dog named Max"
        - "User is learning TypeScript"
        - "User prefers concise explanations"
        - "User lives in San Francisco"

        EXAMPLES OF WHAT NOT TO MEMORIZE:
        - "User asked about weather today" (temporary)
        - "User is currently debugging code" (situational)
        - "User said hello" (trivial interaction)

        Based on the conversation, you must return three things:

        1. UPDATES: If an existing memory needs to be modified because new information changes or refines it, include it in updates with the memory's ID and the new content.
           - Example: If existing memory says "User lives in San Francisco" but user mentions they moved to New York, update that memory.

        2. DELETIONS: If an existing memory is no longer true or relevant, include its ID in deletions.
           - Example: If user says "I no longer have a dog", delete the memory about having a dog.

        3. ADDITIONS: New permanent memories that don't already exist. Each addition should be a concise, factual statement about the user.
           - Only add memories that are genuinely new information not covered by existing memories.

        Return empty arrays for any category that has no changes.

        EXISTING MEMORIES:
        ${memoriesText}
        `,
				messages: convertToModelMessages(allMessages),
			});

			const { updates, deletions, additions } = memoriesResult.object;

			console.log("Updates", updates);
			console.log("Deletions", deletions);
			console.log("Additions", additions);

			// Only delete memories that are not being updated
			const filteredDeletions = deletions.filter(
				(deletion) => !updates.some((update) => update.id === deletion),
			);

			// Update the memories that need to be updated
			for (const update of updates) {
				updateMemory(update.id, {
					memory: update.memory,
					createdAt: new Date().toISOString(),
				});
			}

			// Delete the memories that need to be deleted
			for (const deletion of filteredDeletions) {
				deleteMemory(deletion);
			}

			// Save the new memories
			saveMemories(
				additions.map((addition) => ({
					id: generateId(),
					memory: addition,
					createdAt: new Date().toISOString(),
				})),
			);
		},
	});

	return createUIMessageStreamResponse({
		stream,
	});
};
