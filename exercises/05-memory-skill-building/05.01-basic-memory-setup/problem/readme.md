# Building a Memory System for Personal Assistants

Personal assistants need to truly understand who you are. They need to know your preferences, habits, and important details about your life.

An LLM system that learns and retains this information is a long-term goal for many AI applications. It's an area of extremely active research.

The [AI SDK](https://ai-sdk.dev/docs/foundations/overview) provides all the primitives you need to build a memory system. However, the real challenge is in the implementation details.

In this exercise, you'll build the foundational pieces: loading memories from a database, displaying them to the model, and extracting new permanent memories from each conversation.

## Steps To Complete

### Understanding Memory Systems

- [ ] Understand why personal assistants need memory systems

Memory systems allow LLMs to retain information about users across conversations. This enables:

- Learning user preferences and habits over time
- Providing personalized assistance
- Building trust through demonstrated understanding

### Loading Memories From The Database

- [ ] Review the code structure in `api/chat.ts`

Look at the POST route handler where incoming chat messages are processed. The system prompt currently has a placeholder for memories in XML tags.

- [ ] Locate the imported memory functions

The `loadMemories` and `saveMemories` functions are already imported:

```ts
import {
  loadMemories,
  saveMemories,
  type DB,
} from './memory-persistence.ts';
```

- [ ] Load memories from the database in the POST route

Use the `loadMemories()` function to fetch memories from the database and store the result in a variable:

```ts
// TODO: Use the loadMemories function to load the memories from the database
const memories = await loadMemories();
```

### Formatting Memories For The System Prompt

- [ ] Review the `formatMemory()` function

This function takes a single memory item and formats it nicely for display:

```ts
const formatMemory = (memory: DB.MemoryItem) => {
  return [
    `Memory: ${memory.memory}`,
    `Created At: ${memory.createdAt}`,
  ].join('\n');
};
```

- [ ] Format the loaded memories for the system prompt

Use the `formatMemory()` function to format each memory item and join them together. Store the result in the `memoriesText` variable:

```ts
// TODO: Format the memories to display in the UI using the formatMemory function
const memoriesText = memories.map(formatMemory).join('\n\n');
```

### Extracting New Memories

- [ ] Understand the memory extraction process

The [onFinish](https://ai-sdk.dev/docs/troubleshooting/stream-abort-handling) callback runs after the model responds. This is where new memories are extracted and saved.

- [ ] Generate new memories from the conversation

Use [generateObject()](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) to analyze the full conversation and extract memories. Pass it the entire message history and existing memories:

```ts
onFinish: async (response) => {
  const allMessages = [...messages, ...response.messages];

  // TODO: Generate the memories using the generateObject function
  // Pass it the entire message history and the existing memories
  // Write a system prompt that tells the LLM to only focus on permanent memories
  // and not temporary or situational information
  const memoriesResult = TODO;

  const newMemories = memoriesResult.object.memories;

  // TODO: Save the new memories to the database using the saveMemories function
},
```

Write a system prompt that focuses on permanent memories about the user - their attributes, preferences, and long-term information. Avoid temporary or situational details.

- [ ] Extract the memories from the result object

After generateObject() completes, access the memories array stored in `memoriesResult.object.memories`:

```ts
const newMemories = memoriesResult.object.memories;
```

### Saving And Logging Memories

- [ ] Add a console log to track extracted memories

Log the `newMemories` array so you can see what's being saved:

```ts
console.log('newMemories', newMemories);
```

- [ ] Save the extracted memories to the database

Create memory objects with the required fields: `id`, `memory`, and `createdAt`. Use [generateId()](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-id) for each memory's ID and `new Date().toISOString()` for the timestamp:

```ts
const newMemories = memoriesResult.object.memories;

console.log('newMemories', newMemories);

saveMemories(
  // TODO: Map over the newMemories array and create memory objects with the required fields
  TODO,
);
```

### Testing The Memory System

- [ ] Run the application

Start the dev server with the command:

```bash
pnpm run dev
```

- [ ] Open the chat interface

Navigate to `localhost:3000` in your browser. You should see the chat interface with the pre-filled message: "Interview me about my life and work. Ask one question at a time."

- [ ] Send the initial message

Send the pre-filled message and observe the conversation. The assistant will ask you questions about your life and work. Answer the questions to provide material for memory extraction.

- [ ] Check the server console for memory extraction logs

Look for output showing what memories were extracted:

```txt
newMemories [
  'User works as a software engineer',
  'User is learning TypeScript',
  'User prefers concise explanations'
]
```

- [ ] Inspect the generated memories file

Navigate to the `data` directory and open `memories.local.json`. After several exchanges, the file should contain extracted memories:

```json
{
  "memories": [
    {
      "id": "a1b2c3d4",
      "memory": "User works as a software engineer",
      "createdAt": "2024-01-15T10:30:45.123Z"
    },
    {
      "id": "e5f6g7h8",
      "memory": "User is learning TypeScript",
      "createdAt": "2024-01-15T10:31:22.456Z"
    },
    {
      "id": "i9j0k1l2",
      "memory": "User prefers concise explanations",
      "createdAt": "2024-01-15T10:32:01.789Z"
    },
    {
      "id": "m3n4o5p6",
      "memory": "User has a dog named Max",
      "createdAt": "2024-01-15T10:33:15.234Z"
    }
  ]
}
```

- [ ] Test memory persistence across conversations

Have several exchanges with the assistant. Check that:

- New memories are added to the database
- Memories persist across new conversations
- The assistant references stored memories in its [system prompt](https://ai-sdk.dev/docs/foundations/prompts)
