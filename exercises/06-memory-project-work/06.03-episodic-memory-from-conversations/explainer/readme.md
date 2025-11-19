We now have a system with working memory and semantic facts - but we're missing something crucial that humans have: episodic memory.

Humans learn from their experiences. We remember times we succeeded, times we failed, and we use those memories to guide future decisions. Our AI assistant should do the same.

The way to model this is by having the assistant learn from each conversation it has. Each chat becomes an episode - a memory of something the system has done. When starting a new chat, the system can retrieve relevant past episodes to inform its responses, creating a smarter, more informed assistant that learns over time.

## Storing an LLM summary alongside the chat

<!-- VIDEO -->

Let's add LLM summary storage to our chat database to enable episodic memory creation. This will capture key information about each conversation for future retrieval and learning.

Recommendation: cherry-pick this commit. This is setting up the foundation for episodic memory, and is mostly database work.

### Steps To Complete

#### Adding the `ChatLLMSummary` interface

- [ ] Open `src/lib/persistence-layer.ts` and add a new `ChatLLMSummary` interface to the `DB` namespace. This interface will store structured information about each conversation.

<Spoiler>

```typescript
// src/lib/persistence-layer.ts

export namespace DB {
  // ... existing code ...

  // ADDED: New interface for LLM-generated conversation summaries
  export interface ChatLLMSummary {
    /**
     * 2-4 keywords that would help identify similar future conversations
     */
    tags: string[];
    /**
     * One sentence describing what the conversation accomplished
     */
    summary: string;
    /**
     * Most effective approach or strategy used in this conversation
     */
    whatWorkedWell: string;
    /**
     * Most important pitfall or ineffective approach to avoid
     */
    whatToAvoid: string;
  }
}
```

</Spoiler>

#### Adding `llmSummary` to the `Chat` interface

- [ ] Update the `Chat` interface to include an optional `llmSummary` property. Making it optional ensures existing chats in the database won't break.

<Spoiler>

```typescript
// src/lib/persistence-layer.ts

export interface Chat {
  id: string;
  title: string;
  messages: MyMessage[];
  // ADDED: Optional LLM summary for episodic memory
  llmSummary?: ChatLLMSummary;
  createdAt: string;
  updatedAt: string;
}
```

</Spoiler>

#### Creating the `updateChatLLMSummary` function

- [ ] Add a new function `updateChatLLMSummary` that takes a chat ID and an LLM summary, then updates the database. This allows the system to persist generated summaries.

<Spoiler>

```typescript
// src/lib/persistence-layer.ts

// ADDED: Function to store LLM summary on a chat
export async function updateChatLLMSummary(
  chatId: string,
  llmSummary: DB.Chat['llmSummary'],
): Promise<DB.Chat | null> {
  const chats = await loadChats();
  const chatIndex = chats.findIndex(
    (chat) => chat.id === chatId,
  );
  if (chatIndex === -1) {
    return null;
  }
  chats[chatIndex]!.llmSummary = llmSummary;
  chats[chatIndex]!.updatedAt = new Date().toISOString();
  await saveChats(chats);
  return chats[chatIndex]!;
}
```

</Spoiler>

## Adding the `reflectOnChat` function

<!-- VIDEO -->

Let's create a function that analyzes conversations and generates summaries for episodic memory.

Recommendation: hand-code this commit. This is new ground.

### Steps To Complete

#### Creating the reflect-on-chat file with imports and system prompt

- [ ] Create a new file `src/app/reflect-on-chat.ts` with the necessary imports and system prompt constant. The system prompt guides the LLM on how to extract useful memory elements from conversations.

<Spoiler>

```typescript
// src/app/reflect-on-chat.ts
import {
  DB,
  getChat,
  updateChatLLMSummary,
} from '@/lib/persistence-layer';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { chatToText } from './utils';

// Inspired by: https://github.com/ALucek/agentic-memory/blob/main/langgraph/agentic_memory_langgraph.ipynb
const SYSTEM_PROMPT = `
You are analyzing conversations to create summaries that will help guide future interactions. Your task is to extract key elements that would be most helpful when encountering similar conversations in the future.

Review the conversation and create a memory reflection following these rules:

1. For any field where you don't have enough information or the field isn't relevant, use "N/A"
2. Be extremely concise - each string should be one clear, actionable sentence
3. Focus only on information that would be useful for handling similar future conversations
4. contextTags should be specific enough to match similar situations but general enough to be reusable

Examples:
- Good contextTags: ["transformer_architecture", "attention_mechanism", "methodology_comparison"]
- Bad contextTags: ["machine_learning", "paper_discussion", "questions"]

- Good summary: "Explained how the attention mechanism in the BERT paper differs from traditional transformer architectures"
- Bad summary: "Discussed a machine learning paper"

- Good whatWorkedWell: "Using analogies from matrix multiplication to explain attention score calculations"
- Bad whatWorkedWell: "Explained the technical concepts well"

- Good whatToAvoid: "Diving into mathematical formulas before establishing user's familiarity with linear algebra fundamentals"
- Bad whatToAvoid: "Used complicated language"

Additional examples for different research scenarios:

Context tags examples:
- ["experimental_design", "control_groups", "methodology_critique"]
- ["statistical_significance", "p_value_interpretation", "sample_size"]
- ["research_limitations", "future_work", "methodology_gaps"]

Conversation summary examples:
- "Clarified why the paper's cross-validation approach was more robust than traditional hold-out methods"
- "Helped identify potential confounding variables in the study's experimental design"

What worked examples:
- "Breaking down complex statistical concepts using visual analogies and real-world examples"
- "Connecting the paper's methodology to similar approaches in related seminal papers"

What to avoid examples:
- "Assuming familiarity with domain-specific jargon without first checking understanding"
- "Over-focusing on mathematical proofs when the user needed intuitive understanding"

Do not include any text outside the JSON object in your response.
`;
```

</Spoiler>

#### Creating the schema for the LLM response

- [ ] Define the Zod schema that structures what the LLM should return. This ensures the response has the fields we need for memory storage.

<Spoiler>

```typescript
// src/app/reflect-on-chat.ts
// ADDED: Schema for LLM output to ensure structured memory data
const reflectionSchema = z.object({
  tags: z
    .array(z.string())
    .describe(
      "2-4 keywords that would help identify similar future conversations. Use field-specific terms like 'deep_learning', 'methodology_question', 'results_interpretation'",
    ),
  summary: z
    .string()
    .describe(
      'One sentence describing what the conversation accomplished',
    ),
  whatWorkedWell: z
    .string()
    .describe(
      'Most effective approach or strategy used in this conversation',
    ),
  whatToAvoid: z
    .string()
    .describe(
      'Most important pitfall or ineffective approach to avoid',
    ),
});
```

</Spoiler>

#### Implementing the reflectOnChat function

- [ ] Create the `reflectOnChat` function that fetches a chat, generates a reflection using the LLM, and saves it to the database.

<Spoiler>

```typescript
// src/app/reflect-on-chat.ts
// ADDED: Main function that generates and stores memory reflections
export const reflectOnChat = async (chatId: string) => {
  const chat = await getChat(chatId);

  if (!chat) {
    throw new Error(`Chat with ID ${chatId} not found`);
  }

  // ADDED: Call LLM to generate structured reflection
  const result = await generateObject({
    model: google('gemini-2.5-flash-lite'),
    schema: reflectionSchema,
    system: SYSTEM_PROMPT,
    prompt: chatToText(chat),
  });

  console.log('Reflect on chat result:', result.object);

  // ADDED: Persist the reflection to the database
  await updateChatLLMSummary(chat.id, result.object);
};
```

</Spoiler>

#### Adding the chatToText utility function

- [ ] Add the `chatToText` function to `src/app/utils.ts`. This converts a chat database object into a text representation that can be used as a prompt for the LLM.

First, add the import:

```typescript
// src/app/utils.ts
// ADDED: Import for type safety
import { DB } from '@/lib/persistence-layer';
```

Then add the function:

<Spoiler>

```typescript
// src/app/utils.ts
// ADDED: New utility to convert chat to text format for LLM processing
export const chatToText = (chat: DB.Chat): string => {
  const frontmatter = [`Title: ${chat.title}`];

  // ADDED: Include LLM summary if it exists
  const summary = chat.llmSummary
    ? [
        `Summary: ${chat.llmSummary.summary}`,
        `What Worked Well: ${chat.llmSummary.whatWorkedWell}`,
        `What To Avoid: ${chat.llmSummary.whatToAvoid}`,
        `Tags: ${chat.llmSummary.tags.join(', ')}`,
      ]
    : [];

  // ADDED: Convert all messages to text format
  const messages = chat.messages.map(messageToText).join('\n');

  return [...frontmatter, ...summary, messages].join('\n');
};
```

</Spoiler>

## Adding searching for related chats

<!-- VIDEO -->

Let's add a function to search for related chats by embedding the current message history and finding similar conversations.

Recommendation: cherry-pick this commit, then tweak. This is similar to other embeddings-based search functions we've built.

### Steps To Complete

#### Creating the `searchForRelatedChats` function

- [ ] Create a new file called `search-for-related-chats.ts` in the `src/app` directory. This function will find chats related to the current conversation by embedding the message history.

Import the necessary dependencies:

```typescript
// src/app/search-for-related-chats.ts
import { DB, loadChats } from '@/lib/persistence-layer';
import { searchWithEmbeddings } from './search';
import { chatToText, messageHistoryToQuery } from './utils';
import { MyMessage } from './api/chat/route';
```

<Spoiler>

```typescript
// src/app/search-for-related-chats.ts

const CHATS_TO_SEARCH = 3;

export const searchForRelatedChats = async (
  currentChatId: string,
  messages: MyMessage[],
) => {
  // ADDED: Load all chats except the current one
  const allOtherChats = await loadChats().then((chats) =>
    chats.filter((c) => c.id !== currentChatId),
  );

  // ADDED: Convert message history into an embeddable query
  const query = messageHistoryToQuery(messages);

  // ADDED: Search through other chats using embeddings
  const relatedChats = await searchWithEmbeddings(
    query,
    allOtherChats,
    chatToText,
  );

  // ADDED: Return only the top 3 most relevant chats
  return relatedChats.slice(0, CHATS_TO_SEARCH);
};
```

</Spoiler>

#### Testing the episodic memory system

- [ ] Start the development server and create a first conversation about a specific topic (e.g., asking "what are the differences between types and interfaces?").

```bash
pnpm dev
```

- [ ] After completing the first conversation, the system will automatically call `reflectOnChat` to generate an LLM summary with tags, summary, what worked well, and what to avoid.

- [ ] Start a second conversation about a related topic (e.g., asking "which are better - types or interfaces?"). The system will call `searchForRelatedChats` to find and include the first conversation in the context.

- [ ] Verify that the LLM leverages insights from the first conversation (what worked well, what to avoid) when responding in the second conversation, demonstrating that episodic memory is improving the chat experience.
