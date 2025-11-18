Our memory system is working nicely, but it has a big problem - we can only _add_ memories. We can't update or delete them.

This is quite limiting. Even "permanent" facts about people change over time. Your preferences evolve. Your job changes. Your favorite coffee shop closes down.

To build a truly intelligent assistant, we need to extend our memory management to support three operations: adding new memories, updating existing ones, and removing outdated information.

## Steps To Complete

### Understanding the Memory Management Schema

- [ ] Review the [generateObject](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) call in the `onFinish` callback in `api/chat.ts`

This is where we extract memories from each conversation. Currently, the schema only defines how to extract new memories.

- [ ] Update the schema to support three operations: `updates`, `deletions`, and `additions`

Define `updates` as an array of objects with an `id` and updated `memory` content:

```ts
updates: z.array(TODO);
```

- [ ] Define `deletions` as an array of memory IDs to remove

```ts
deletions: z.array(TODO);
```

- [ ] Define `additions` as an array of new memory strings to add

```ts
additions: z.array(TODO);
```

### Updating the System Prompt

- [ ] Locate the `system` prompt in the generateObject call

This prompt tells the LLM how to manage memories. It currently only handles extraction.

- [ ] Update the system prompt to instruct the LLM to return `updates`, `deletions`, and `additions`

Your prompt should explain:

| When to Update                              | When to Delete                    |
| ------------------------------------------- | --------------------------------- |
| User preferences change                     | Information is outdated           |
| New information contradicts old information | Information is incorrect          |
| Clarifications are provided                 | Information is no longer relevant |

Here's a starting point for what the prompt should convey:

```
MEMORY MANAGEMENT TASKS:
1. ADDITIONS: Extract any new permanent memories from this conversation that aren't already covered by existing memories.
2. UPDATES: Identify existing memories that need to be updated with new information (e.g., if user mentioned they moved cities, update their location memory).
3. DELETIONS: Identify existing memories that are now outdated, incorrect, or no longer relevant based on new information in the conversation.
```

### Implementing Memory Operations

- [ ] Extract the `updates`, `deletions`, and `additions` from the result

```ts
const { updates, deletions, additions } = memoriesResult.object;
```

- [ ] Console log all three to verify they're being extracted correctly

```ts
console.log('Updates', updates);
console.log('Deletions', deletions);
console.log('Additions', additions);
```

- [ ] Handle the filtering that's already been provided

The code already includes filtering to prevent deleting memories that are being updated:

```ts
const filteredDeletions = deletions.filter(
  (deletion) =>
    !updates.some((update) => update.id === deletion),
);
```

- [ ] Implement the memory updates

Loop through each update and call `updateMemory()` with the memory `id` and updated content:

```ts
updates.forEach((update) => TODO);
```

- [ ] Implement the memory deletions

Loop through each filtered deletion and call `deleteMemory()` with the memory `id`:

```ts
filteredDeletions.forEach((deletion) => TODO);
```

- [ ] Implement saving new memories

Use `saveMemories()` to persist additions to the database. Map over additions to create memory objects with required fields:

```ts
saveMemories(additions.map((addition) => TODO));
```

### Testing the Complete Memory System

- [ ] Start the dev server

```bash
pnpm run dev
```

- [ ] Open `localhost:3000` in your browser

- [ ] Have a multi-turn conversation with the assistant

Start with: "Interview me about my life and work. Ask one question at a time."

Answer several questions to establish initial memories. Then mention that one of your preferences has changed (e.g., "I used to enjoy cider, but I've stopped drinking it").

- [ ] Check the server console for memory operations

Look for output showing `updates`, `deletions`, and `additions` being logged.

- [ ] Verify memory persistence

Open `data/memories.local.json` to see the stored memories. Start a new conversation in the chat. The assistant should reference your memories and reflect any updates you've made.

- [ ] Test that memories actually update

Have another conversation where you contradict or clarify a previous memory. Verify that the old memory is updated rather than a new one being created. Check `data/memories.local.json` to confirm the memory was modified, not duplicated.
