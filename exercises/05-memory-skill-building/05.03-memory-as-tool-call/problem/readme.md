Our previous memory setup was a bit wasteful. Every time the conversation finished streaming, we'd automatically extract memories by calling `generateObject`. This meant the LLM couldn't decide when memories actually needed updating.

What if we let the LLM decide for itself? We can use a tool call loop to give the model control over when to update memories. When users share personal information, contradict previous details, or ask to remember something, the model can call a `manageMemories` tool.

This is more efficient and gives the agent better judgment about what's actually worth remembering.

## Steps To Complete

### Setting Up The Memory Management Tool

- [ ] Open `api/chat.ts` and locate the `tools` object in the `streamText` call
  - You'll see a TODO comment where the `manageMemories` tool should be defined
  - This tool needs to handle three operations: updates, deletions, and additions

- [ ] Create the `manageMemories` tool using the `tool()` function

```ts
// TODO: Add the manageMemories tool
// The tool should have three parameters:
// - updates: array of objects with { id: string, memory: string }
// - deletions: array of strings (memory IDs to delete)
// - additions: array of strings (new memories to add)
// In the execute function, perform the actual memory operations
tools: {
  manageMemories: TODO,
},
```

- [ ] Implement the `execute` function for the tool
  - Filter out deletions that are being updated (to avoid conflicts)
  - Call `updateMemory()` for each update
  - Call `deleteMemory()` for each deletion
  - Call `saveMemories()` for each addition, creating memory objects with `id`, `memory`, and `createdAt` fields

```ts
execute: async ({ updates, deletions, additions }) => {
  // TODO: Perform the actual memory operations
  // Handle updates, deletions, and additions

  // TODO: Return a success message
  return TODO;
},
```

### Enabling Tool Calling With stopWhen

- [ ] Locate the TODO comment for `stopWhen` in the `streamText` call
  - This controls when the model stops generating and how many tool calls it can make

- [ ] Add a stop condition using `stepCountIs(5)`
  - This allows up to 5 generation steps, giving the model room to call tools multiple times if needed

```ts
// TODO: Add stopWhen with stepCountIs to allow the agent to call tools
// Use stepCountIs(5) to allow up to 5 generation steps
stopWhen: TODO,
```

### Improving The System Prompt

- [ ] Review the system prompt in the `streamText` call
  - Currently it loads memories but doesn't guide the model on when to use the tool

- [ ] Enhance the system prompt with guidance for tool usage
  - Add instructions for when the model should call `manageMemories`
  - Explain what counts as personal information worth remembering versus casual conversation
  - Suggest that the model can batch multiple turns before calling the tool

The system prompt should include directives like:

- When to call the tool (user shares personal info, contradicts previous statements, asks to remember/forget)
- When to skip the tool (casual small talk, temporary questions)
- That batching multiple conversation turns is acceptable

```ts
system: `
TODO: Add guidelines for when to use the tool and when to skip it
`,
```

### Testing The Tool-Based Memory System

- [ ] Run the application with `pnpm run dev`

- [ ] Open `localhost:3000` in your browser
  - The chat interface will load with the pre-filled message

- [ ] Start a conversation by sending "Interview me about my life and work. Ask one question at a time."
  - The model will begin asking questions

- [ ] Answer with personal information in your responses
  - Share details about your job, hobbies, preferences, or experiences

- [ ] Check the server console for tool call logs
  - Look for output showing when `manageMemories` is being called
  - You should see which memories are being added, updated, or deleted

```txt
Memory tool called:
Updates: []
Deletions: []
Additions: [
  'User works in software development',
  'User has a dog named Max',
  'User enjoys hiking on weekends'
]
```

- [ ] Inspect the `data/memories.local.json` file after several exchanges
  - Verify that memories are being persisted correctly
  - Check that the memories reflect the information you shared

- [ ] Test the update functionality by contradicting yourself
  - If you mentioned "I like coffee" earlier, later say "Actually, I prefer tea"
  - The model should call the tool with an update operation

- [ ] Verify memory persistence across sessions
  - Close and reopen the chat
  - Start a new conversation and mention something related to previous memories
  - The model should reference the remembered information in its responses
