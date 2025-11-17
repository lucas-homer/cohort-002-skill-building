You've built a solid chunking and retrieval setup, but it's time to put it to the test. The quality of your chunks directly impacts how well your search results perform.

In this exercise, you'll explore how different retrieval methods—BM25 for keyword matching, semantic search for meaning, and RRF for combining both—rank the same chunks differently. You'll also experiment with chunk sizes to find the sweet spot for your use case.

## Steps To Complete

### Testing Retrieval Methods

- [ ] Navigate to the exercise directory and understand that this exercise combines chunking with retrieval techniques (BM25, embeddings, and RRF)

- [ ] Run the application using `pnpm run dev`
  - Watch for "Embedding book chunks" and "Embedding complete" messages
  - The server will create embeddings for all chunks

- [ ] Test the default query with semantic search of "How did TypeScript start?" and keywords "TypeScript start beginning"
  - Observe the chunks returned in the interface
  - Note that chunks are ordered by RRF (Reciprocal Rank Fusion) by default

- [ ] Experiment with the "Order by" controls at the top of the page
  - Click "BM25" to see results ordered by keyword matching
  - Click "Semantic" to see results ordered by embedding similarity
  - Click "RRF" to see results ordered by the fusion of both approaches

- [ ] Try different search queries to see which approach works best
  - Test semantic queries like "What are the origins of TypeScript?"
  - Test keyword queries like "interface type"
  - Observe how different ordering methods perform

- [ ] Test TypeScript-specific queries to evaluate chunk quality
  - Try searching for "as const", "enums", "generics", or "conditional types"
  - Observe which ordering method returns the most relevant results

### Experimenting With Configuration

- [ ] Navigate to `api/utils.ts` and locate the chunk size configuration

```ts
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2000,
  chunkOverlap: 200,
  separators: [
    // ...
  ],
});
```

- [ ] Experiment with different chunk sizes
  - Try reducing `chunkSize` to `1000` and `chunkOverlap` to `100`
  - Stop the server and delete the `data` folder to clear the embeddings cache
  - Restart with `pnpm run dev` to re-embed with new chunk sizes

- [ ] Consider which chunk size works best for your use case
  - Smaller chunks (500-1000 characters) may be more precise but less contextual
  - Larger chunks (2000-4000 characters) may provide more context but less precision
