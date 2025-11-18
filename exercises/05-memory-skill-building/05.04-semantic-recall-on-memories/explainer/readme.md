Our memory system is growing, but we've hit a critical problem. We're loading _every single memory_ into the LLM, regardless of whether it's relevant to the current conversation. This is inefficient and will quickly become a bottleneck as memory databases grow larger.

Think about it: if you're asking about your favorite drinks, you don't need memories about your childhood hometown cluttering up the context. You need the system to be smart about which memories matter _right now_.

This is where retrieval comes back into play. Just like we learned earlier, we need to search through our memories semantically and return only the most relevant ones.

## Steps To Complete

### Understand The Problem With Loading All Memories

- [ ] Review how the previous approach loaded memories

The old system used `loadMemories()` which fetches every single memory from the database. All memories were added to the system prompt, regardless of relevance.

- [ ] Consider the scalability issue

As the memory database grows to hundreds or thousands of items, passing all of them to the LLM becomes wasteful. This pollutes the [context window](https://www.aihero.dev/what-is-the-context-window) with irrelevant information.

### Understand How Query Rewriting Works

- [ ] Look at the query rewriter in `api/chat.ts`

The query rewriter analyzes the conversation history to understand what information the user is asking about. It generates `keywords` for exact keyword matching and a `searchQuery` for semantic search.

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

- [ ] Understand what the query rewriter produces

It generates `keywords` for [BM25 search](https://en.wikipedia.org/wiki/Okapi_BM25) (exact keyword matching). It generates a `searchQuery` for [embedding](https://ai-sdk.dev/docs/ai-sdk-core/embeddings#embeddings)-based search (semantic similarity).

### See How Hybrid Search Retrieves Memories

- [ ] Examine how the results are retrieved in `api/chat.ts`

The `searchMemories()` function combines two retrieval methods: embeddings for semantic similarity and BM25 for keyword matching.

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

- [ ] Notice how only the top 4 memories are used

The `.slice(0, 4)` ensures we don't bloat the context window. These are the most relevant memories for the current query.

- [ ] Understand reciprocal rank fusion

The `searchMemories()` function uses [reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion) to combine the results from both retrieval methods.

### Test The Selective Retrieval

- [ ] Run the application with `pnpm run dev`

- [ ] Open `localhost:3000` in your browser

- [ ] Start with the pre-filled prompt: "Interview me about my life and work. Ask one question at a time."

- [ ] Answer several questions to build up memories

- [ ] Ask a specific follow-up question like "What do I like drinking?"

Look at the server console to see the query rewriter output:

```txt
{
  keywords: [ 'drink', 'drinks', 'favorite', 'beverage', 'prefer' ],
  searchQuery: 'information about user\'s drinks and beverages'
}
```

- [ ] Observe which memories appear in the context

Only memories related to drinks and beverages should be retrieved. Unrelated memories about your location or work are filtered out.

### Recognize The Pattern

- [ ] Understand why this pattern matters

As memory databases grow larger, selective retrieval becomes essential. Every memory system needs a way to winnow down which information reaches the LLM.

This prevents context pollution from irrelevant information. It scales better as the memory database grows. It focuses the LLM's attention on what actually matters for the current conversation.

- [ ] Explore how this could be extended

A [re-ranking](https://www.elastic.co/docs/solutions/search/ranking) step could further refine the results. Multiple retrieval methods could run in parallel. Different weighting could be applied to different memory types.
