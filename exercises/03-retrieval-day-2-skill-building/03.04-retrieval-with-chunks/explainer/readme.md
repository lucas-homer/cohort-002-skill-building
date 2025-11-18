You've built a solid chunking and retrieval setup, but now it's time to put it to the test. The quality of your chunks directly impacts how well your search results perform.

In this exercise, you'll explore how different retrieval methods rank the same chunks differently. [BM25](/PLACEHOLDER/bm25-keyword-search) handles keyword matching, [semantic search](/PLACEHOLDER/semantic-search) captures meaning, and [RRF](/PLACEHOLDER/reciprocal-rank-fusion) combines both approaches.

You'll also experiment with `chunkSize` and `chunkOverlap` to find the sweet spot for your use case.

## Steps To Complete

### Testing Retrieval Methods

- [ ] Navigate to the exercise directory and understand that this combines chunking with three retrieval techniques

The exercise includes [BM25](/PLACEHOLDER/bm25-keyword-search), [embeddings](/PLACEHOLDER/embeddings), and [RRF](/PLACEHOLDER/reciprocal-rank-fusion) to rank chunks in different ways.

- [ ] Run the application using `pnpm run dev`

Watch for "Embedding book chunks" and "Embedding complete" messages. The server will create [embeddings](/PLACEHOLDER/embeddings) for all chunks.

```txt
Embedding book chunks...
Embedding complete
Server running at http://localhost:3000
```

- [ ] Test the default query with semantic search

Search for "How did TypeScript start?" with keywords "TypeScript start beginning".

Observe the chunks returned in the interface. Note that chunks are ordered by [RRF](/PLACEHOLDER/reciprocal-rank-fusion) (Reciprocal Rank Fusion) by default.

- [ ] Experiment with the "Order by" controls at the top of the page

Try clicking through each ordering method:

| Ordering Method | What It Shows                               |
| --------------- | ------------------------------------------- |
| **BM25**        | Results ranked by keyword matching          |
| **Semantic**    | Results ranked by embedding similarity      |
| **RRF**         | Results ranked by fusion of both approaches |

Each method may surface different chunks as most relevant.

- [ ] Try different search queries to see which approach works best

Test a mix of semantic and keyword queries:

- Semantic queries like "What are the origins of TypeScript?"
- Keyword queries like "interface type"
- Observe how different ordering methods perform

Notice which approach returns the most relevant results for each query type.

- [ ] Test TypeScript-specific queries to evaluate chunk quality

Search for features like `as const`, `enums`, `generics`, or `conditional types`.

Observe which ordering method returns the most relevant results. This will help you understand how well your chunks capture TypeScript concepts.

### Experimenting With Configuration

- [ ] Navigate to `api/utils.ts` and locate the `chunkSize` configuration

```ts
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2000,
  chunkOverlap: 200,
  separators: [
    // ...
  ],
});
```

The [`RecursiveCharacterTextSplitter`](/PLACEHOLDER/recursive-character-text-splitter) breaks your content into manageable pieces. `chunkSize` controls how large each piece is, and `chunkOverlap` controls how much they overlap.

- [ ] Experiment with different chunk sizes

Try reducing `chunkSize` to `1000` and `chunkOverlap` to `100`:

```ts
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
  separators: [
    // ...
  ],
});
```

Stop the server and delete the `data` folder to clear the [embeddings](/PLACEHOLDER/embeddings) cache.

Restart with `pnpm run dev` to re-embed with new chunk sizes.

- [ ] Consider which chunk size works best for your use case

Smaller chunks and larger chunks have different trade-offs:

| Chunk Size          | Pros                      | Cons                                   |
| ------------------- | ------------------------- | -------------------------------------- |
| **500-1000 chars**  | More precise, less noise  | Less context, may split important info |
| **2000-4000 chars** | More context, better flow | Harder to find exact info, more noise  |

Experiment with different sizes to see which gives you better search results for your specific content and queries.
