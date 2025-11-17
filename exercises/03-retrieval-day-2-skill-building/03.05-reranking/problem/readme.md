When you're retrieving search results, you face a tricky balance. Take too many chunks and you'll load your LLM with irrelevant information. Take too few and you might miss the answer entirely.

Reranking solves this problem by using an LLM to filter results. You pass a larger set of search results (like 30 chunks) to a reranking model, which evaluates them against your query and returns only the truly relevant ones.

This two-step process (retrieve broadly, then filter intelligently) gives you the best of both worlds: comprehensive coverage without the noise.

## Steps To Complete

### Understanding Reranking

- [ ] Understand that reranking improves search results by filtering out irrelevant chunks
  - Reranking takes a larger set of search results (e.g., 30 chunks)
  - An LLM evaluates which ones are truly relevant to the user's query
  - Only the most relevant chunks are returned to the user

- [ ] Review how the search algorithm currently works in `api/search.ts`
  - BM25 provides keyword-based matching scores
  - Embeddings provide semantic similarity scores
  - Reciprocal Rank Fusion (RRF) combines both scores into a single ranking

### Implementing Reranking

- [ ] Locate the TODO comment in `api/search.ts` where reranking should be implemented

```ts
// TODO: Call generateObject to generate an array of IDs
// of the most relevant chunks, based on the user's search query.
// You should tell the LLM to return only the IDs, not the full chunks.
// You should also tell the LLM to be selective and only include chunks
// that are genuinely helpful for answering the question.
// If a chunk is only tangentially related or not relevant,
// exclude its ID.
const rerankedResults = TODO;
```

- [ ] Create a Zod schema that expects an array of numbers (chunk IDs)

```ts
const schema = z.object({
  resultIds: z
    .array(z.number())
    .describe('Array of IDs for the most relevant chunks'),
});
```

- [ ] Call `generateObject` with the appropriate parameters
  - Use `google('gemini-2.5-flash-lite')` as the model
  - Set a `system` prompt explaining the reranker's role and instructing it to be selective
  - Pass the `schema` you created
  - In the `prompt`, include the `searchQuery` and formatted `chunksWithId`

```ts
const rerankedResults = await generateObject({
  model: google('gemini-2.5-flash-lite'),
  system: `You are a search result reranker...`,
  schema,
  prompt: `Search query: ...\n\nAvailable chunks: ...`,
});
```

- [ ] Access the reranker's results using `rerankedResults.object.resultIds`

```ts
const approvedChunkIds: number[] =
  rerankedResults.object.resultIds;
```

### Testing The Implementation

- [ ] Run the application using `pnpm run dev`

- [ ] Run a test search query like "How did TypeScript start?"
  - Check that chunks appear with different rerank statuses:
    - "Approved" - chunks selected by the reranker (green)
    - "Rejected" - chunks not selected (red)
    - "Not Passed" - chunks not sent to reranker (gray)

- [ ] Experiment with different rerank counts using the UI input
  - Try values like 10, 20, 30, 50
  - Observe how approved chunks appear at the top of results

- [ ] Try different search queries to verify the reranker filters appropriately
