## Steps To Complete

### Implementing Reranking

- [ ] Understand that reranking improves search results by filtering out irrelevant chunks
  - Reranking takes a larger set of search results (e.g., 30 chunks)
  - An LLM evaluates which ones are truly relevant to the user's query
  - Only the most relevant chunks are returned to the user

- [ ] Review how the search algorithm currently works in `api/search.ts`
  - BM25 provides keyword-based matching scores
  - Embeddings provide semantic similarity scores
  - Reciprocal Rank Fusion (RRF) combines both scores into a single ranking
  - Currently, all top results are returned without filtering

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

- [ ] Observe the variables available for the reranker call
  - `chunksWithId` - formatted string of chunks with their IDs and content
  - `searchQuery` - combined keywords and semantic search query
  - `topResultsWithId` - array of top results with assigned IDs (0-based indexing)
  - `topResultsAsMap` - map to look up chunk content by ID

- [ ] Review the [generateObject documentation](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) to understand how to call the LLM
  - You'll need to pass a `model`, `system` prompt, `schema`, and `prompt`
  - The schema defines what object structure the LLM should return

- [ ] Create a Zod schema that expects an array of numbers (chunk IDs)

```ts
const schema = z.object({
  resultIds: z
    .array(z.number())
    .describe('Array of IDs for the most relevant chunks'),
});
```

- The `resultIds` field should be an array of numbers representing chunk IDs
- The `.describe()` method helps the LLM understand what to return

- [ ] Call `generateObject` with the appropriate parameters
  - Use `google('gemini-2.5-flash-lite')` as the model (a fast, efficient model)
  - Set a `system` prompt that explains the reranker's role
  - Pass the `schema` you created
  - In the `prompt`, include the `searchQuery` and the formatted `chunksWithId`

Here's the basic structure of your `generateObject` call:

```ts
const rerankedResults = await generateObject({
  model: google('gemini-2.5-flash-lite'),
  system: `You are a search result reranker...`,
  schema,
  prompt: `Search query: ...\n\nAvailable chunks: ...`,
});
```

- [ ] In the system prompt, instruct the LLM to be selective
  - Tell it to only return IDs of genuinely helpful chunks
  - Instruct it to exclude chunks that are only tangentially related
  - Ask it to return only the IDs, not the full chunk content (to save tokens)

```md
You are a search result reranker. Your job is to analyze a list of chunks and return only the IDs of the most relevant chunks.

You should be selective and only include chunks that are genuinely helpful. If a chunk is only tangentially related or not relevant, exclude its ID.

For example:

- If searching for "TypeScript types", include chunks about type annotations
- If searching for "TypeScript types", exclude chunks about type checking only if they don't explain what types are

Return the IDs as a simple array of numbers.
```

- [ ] Structure your prompt to clearly show the search query and available chunks

```ts
prompt: `
  Search query:
  ${searchQuery}

  Available chunks:
  ${chunksWithId}

  Return only the IDs of the most relevant chunks for the user's search query.
`;
```

- Include a "Search query:" section with the `searchQuery` variable
- Include an "Available chunks:" section with the `chunksWithId` variable
- End with clear instructions about what to return

- [ ] Access the reranker's results using `rerankedResults.object.resultIds`

```ts
const approvedChunkIds: number[] =
  rerankedResults.object.resultIds;
```

- This will be an array of numbers (the chunk IDs)
- Store these IDs for comparison with all chunks later

### Testing And Experimenting

- [ ] Run the application using `pnpm run dev`
  - The server will embed chunks and start the dev server
  - Watch for any errors in the terminal

- [ ] Run a test search query like "How did TypeScript start?"
  - Check that chunks appear with different rerank statuses:
    - "Approved" - chunks selected by the reranker (shown in green)
    - "Rejected" - chunks passed to reranker but not selected (shown in red)
    - "Not Passed" - chunks not sent to the reranker at all (shown in gray)

- [ ] Experiment with different rerank counts using the UI input

```
Rerank top: [30] chunks
```

- Try values like 10, 20, 30, 50
- Observe how more or fewer chunks are evaluated by the reranker
- Notice how approved chunks appear at the top of results

- [ ] Try different search queries to verify the reranker filters appropriately
  - Use semantic queries that describe concepts: "How do generics work?"
  - Use keyword queries with specific terms: "generic type parameter"
  - Verify that only truly relevant chunks are approved

- [ ] Optionally experiment with different models in the `generateObject` call

```ts
// Try the smarter but slower model:
model: google('gemini-2.5-flash'),

// Or try the faster lite version:
model: google('gemini-2.5-flash-lite'),
```

- Observe differences in reranking quality and speed
