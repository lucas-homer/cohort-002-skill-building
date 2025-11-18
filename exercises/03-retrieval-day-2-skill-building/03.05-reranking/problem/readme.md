Retrieving search results is a balancing act. Take too many chunks and you'll load your LLM with irrelevant information. Take too few and you might miss the answer entirely.

[Reranking](/PLACEHOLDER/reranking-concept) solves this problem by using an LLM to filter results. You pass a larger set of search results (like 30 chunks) to a reranking model, which evaluates them against your query and returns only the truly relevant ones.

This two-step process gives you the best of both worlds: comprehensive coverage without the noise.

## Steps To Complete

### Understanding Reranking

- [ ] Understand that reranking improves search results by filtering out irrelevant chunks

The reranking process works in stages:

1. Retrieve a larger set of results (e.g., 30 chunks)
2. An LLM evaluates which ones are truly relevant to the user's `searchQuery`
3. Only the most relevant chunks are returned to the user

- [ ] Review how the search algorithm currently works in `api/search.ts`

The current search process combines multiple ranking methods:

| Method                       | Purpose                                    |
| ---------------------------- | ------------------------------------------ |
| BM25                         | Keyword-based matching scores              |
| Embeddings                   | Semantic similarity scores                 |
| Reciprocal Rank Fusion (RRF) | Combines both scores into a single ranking |

Learn more about [BM25 ranking](/PLACEHOLDER/bm25-ranking), [embeddings](/PLACEHOLDER/embeddings), and [reciprocal rank fusion](/PLACEHOLDER/rrf).

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

- [ ] Create a [Zod schema](/PLACEHOLDER/zod-schema-describe) that expects an array of numbers (chunk IDs)

```ts
const schema = z.object({
  resultIds: z
    .array(z.number())
    .describe('Array of IDs for the most relevant chunks'),
});
```

- [ ] Call [`generateObject()`](/PLACEHOLDER/generate-object) with the appropriate parameters

Pass the following to [`generateObject()`](/PLACEHOLDER/generate-object):

- Use [`google('gemini-2.5-flash-lite')`](/PLACEHOLDER/google-models) as the model
- Set a `system` prompt explaining the reranker's role
- Instruct it to be selective and exclude tangentially related chunks
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

- [ ] Access the reranker's results using the [`object`](/PLACEHOLDER/generate-object-result) property

```ts
const approvedChunkIds: number[] =
  rerankedResults.object.resultIds;
```

### Testing The Implementation

- [ ] Run the application using `pnpm run dev`

- [ ] Run a test search query like "How did TypeScript start?"

You should see chunks with different rerank statuses:

| Status     | Meaning                  | Color |
| ---------- | ------------------------ | ----- |
| Approved   | Selected by the reranker | Green |
| Rejected   | Not selected by reranker | Red   |
| Not Passed | Not sent to reranker     | Gray  |

- [ ] Experiment with different rerank counts using the UI input

Try values like `10`, `20`, `30`, and `50`. Observe how approved chunks appear at the top of results as the rerank count changes.

- [ ] Try different search queries to verify the reranker filters appropriately

Test with queries like:

- "What is the history of React?"
- "How do I use hooks?"
- "Explain async/await"

Confirm that the reranker correctly identifies relevant chunks and excludes tangentially related ones.
