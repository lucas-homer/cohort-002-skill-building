Our memory system is growing, but we've hit a critical problem. We're loading _every single memory_ into the LLM, regardless of whether it's relevant to the current conversation. This is inefficient and will quickly become a bottleneck as memory databases grow larger.

Think about it: if you're asking about your favorite drinks, you don't need memories about your childhood hometown cluttering up the context. You need the system to be smart about which memories matter _right now_.

This is where retrieval comes back into play. Just like we learned earlier, we need to search through our memories semantically and return only the most relevant ones.

## Steps To Complete

### Understanding The Problem With Loading All Memories

- [ ] Review how the previous approach loaded memories
  - The old system used `loadMemories()` which fetches every single memory from the database
  - All memories were added to the system prompt, regardless of relevance

- [ ] Consider the scalability issue
  - As the memory database grows to hundreds or thousands of items, passing all of them to the LLM becomes wasteful
  - This pollutes the context window with irrelevant information

### How Query Rewriting Works

- [ ] Look at the query rewriter in `api/chat.ts`

```ts
const queryRewriterResult = await generateObject({
  model: google('gemini-2.5-flash'),
  system: `You are a helpful memory search assistant...`,
  schema: z.object({
    keywords: z
      .array(z.string())
      .describe(
        "A list of keywords to search the user's memories with...",
      ),
    searchQuery: z
      .string()
      .describe(
        "A search query which will be used to search the user's memories...",
      ),
  }),
  messages: convertToModelMessages(messages),
});
```

- [ ] Understand what the query rewriter does
  - It analyzes the conversation history to understand what information the user is asking about
  - It generates `keywords` for exact keyword matching (used by BM25 search)
  - It generates a `searchQuery` for semantic/embedding-based search

### How Hybrid Search Retrieves Memories

- [ ] Examine how the results are retrieved in `api/chat.ts`

```ts
const foundMemories = await searchMemories({
  searchQuery: queryRewriterResult.object.searchQuery,
  keywordsForBM25: queryRewriterResult.object.keywords,
});

const formattedMemories = foundMemories
  .slice(0, 4)
  .map((memory) => formatMemory(memory.memory))
  .join('\n\n');
```

- [ ] Notice how `searchMemories()` combines two retrieval methods
  - It searches using embeddings for semantic similarity
  - It searches using BM25 for keyword matching
  - It uses reciprocal rank fusion to combine the results

- [ ] See how only the top 4 memories are used
  - The `.slice(0, 4)` ensures we don't bloat the context window
  - These are the most relevant memories for the current query

### Testing The Selective Retrieval

- [ ] Run the application with `pnpm run dev`

- [ ] Open `localhost:3000` in your browser

- [ ] Start with the pre-filled prompt: "Interview me about my life and work. Ask one question at a time."

- [ ] Answer several questions to build up memories

- [ ] Ask a specific follow-up question like "What do I like drinking?"
  - Look at the server console to see the query rewriter output

```txt
{
  keywords: [ 'drink', 'drinks', 'favorite', 'beverage', 'prefer' ],
  searchQuery: 'information about user\'s drinks and beverages'
}
```

- [ ] Observe which memories appear in the context
  - Only memories related to drinks and beverages should be retrieved
  - Unrelated memories about your location or work are filtered out

### Understanding The Pattern

- [ ] Recognize that this is a common pattern in memory systems
  - As memory databases grow larger, selective retrieval becomes essential
  - Every memory system needs a way to winnow down which information reaches the LLM

- [ ] Consider why this matters
  - Prevents context pollution from irrelevant information
  - Scales better as the memory database grows
  - Focuses the LLM's attention on what actually matters for the current conversation

- [ ] Explore how this could be extended
  - A re-ranking step could further refine the results
  - Multiple retrieval methods could run in parallel
  - Different weighting could be applied to different memory types
