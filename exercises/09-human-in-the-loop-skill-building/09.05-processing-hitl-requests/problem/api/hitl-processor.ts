import type {
	MyMessage,
	ToolApprovalDecision,
	ToolRequiringApproval,
} from "./chat.ts";

export type HITLError = {
	message: string;
	status: number;
};

export type HITLDecisionsToProcess = {
	tool: ToolRequiringApproval;
	decision: ToolApprovalDecision;
};

export const findDecisionsToProcess = (opts: {
	mostRecentUserMessage: MyMessage;
	mostRecentAssistantMessage: MyMessage | undefined;
}): HITLError | HITLDecisionsToProcess[] => {
	const { mostRecentUserMessage, mostRecentAssistantMessage } = opts;

	// NOTE: If there's no assistant message in the chat,
	// there's nothing to process and we can proceed with
	// the conversation.
	if (!mostRecentAssistantMessage) {
		return [];
	}

	// TODO: Get all the tools requiring approval from the assistant message
	// and return them in an array.
	const tools: ToolRequiringApproval[] = mostRecentAssistantMessage.parts
		.filter((part) => part.type === "data-approval-request")
		.map((part) => part.data.tool);

	// TODO: Get all the decisions that the user has made
	// and return them in a map.
	const decisions = new Map(
		mostRecentUserMessage.parts
			.filter((part) => part.type === "data-approval-decision")
			.map((part) => [part.data.toolId, part.data.decision]),
	);

	const decisionsToProcess: HITLDecisionsToProcess[] = [];

	for (const tool of tools) {
		const decision: ToolApprovalDecision | undefined = decisions.get(tool.id);

		// TODO: if the decision is not found, return a HITLError -
		// the user should make a decision before continuing.
		if (!decision) {
			return {
				status: 400,
				message: `No decision found for tool ${tool.id}`,
			};
		}

		// TODO: if the decision is found, add the tool and
		// decision to the decisionsToProcess array.
		decisionsToProcess.push({
			tool,
			decision,
		});
	}

	return decisionsToProcess;
};
