## Steps To Complete

### Testing Retrieval Methods

- [ ] Navigate to the exercise directory and understand that this exercise combines chunking with retrieval techniques (BM25, embeddings, and RRF)
  - The chunks are now being scored by BM25, semantic search, and reciprocal rank fusion
  - You can view and search through the chunks using the web interface at `localhost:3000`

- [ ] Run the application using `pnpm run dev`
  - Watch for "Embedding book chunks" and "Embedding complete" messages in the terminal
  - The server will create embeddings for all chunks (this may take a moment on first run)

- [ ] Test the default query with semantic search of "How did TypeScript start?" and keywords "TypeScript start beginning"
  - Observe the chunks returned in the interface
  - Note that chunks are ordered by RRF (Reciprocal Rank Fusion) by default

- [ ] Experiment with the "Order by" controls at the top of the page
  - Click "BM25" to see results ordered by keyword matching score
  - Click "Semantic" to see results ordered by embedding similarity
  - Click "RRF" to see results ordered by the fusion of both approaches

- [ ] Notice the score indicators on each chunk card
  - The blue `Type` icon shows the BM25 score (keyword matching)
  - The pink `Brain` icon shows the Semantic score (embedding similarity)
  - The yellow `Zap` icon shows the RRF score (fusion of both)
  - The active ordering method will be highlighted

- [ ] Try a query that favors semantic search over keywords
  - Enter a semantic query like "What are the origins of TypeScript?"
  - Use minimal keywords or leave the keywords field empty
  - Switch between ordering methods to see which approach works best

- [ ] Try a query that favors keyword search over semantic search
  - Enter keywords like "interface type"
  - Keep the semantic query field empty or use a short query
  - Observe how BM25 ordering performs for exact keyword matches

- [ ] Test the example query "types versus interfaces" with keywords "interface type"
  - Order by Semantic to see results like "should you use type or interface for declaring simple object types"
  - Order by BM25 to see how keyword matching performs
  - Order by RRF to see the combined approach

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
  - Remember that changing these values will require re-embedding all chunks
  - Stop the server and delete the `data` folder to clear the embeddings cache
  - Restart the server with `pnpm run dev` to re-embed with new chunk sizes

- [ ] Test TypeScript-specific queries to evaluate chunk quality
  - Try searching for "as const"
  - Try searching for "enums"
  - Try searching for "generics"
  - Try searching for "conditional types"
  - Observe which ordering method returns the most relevant chunks

- [ ] Examine the stats bar at the top of the page
  - Note the total number of chunks
  - Check the average character count per chunk
  - Observe the score range for the current page

- [ ] Use pagination to explore more chunks
  - Click "Next" to see additional results beyond the first 20 chunks
  - Notice how scores change across pages

- [ ] Navigate to `api/search.ts` and review how the three scoring methods are combined

```ts
export const searchChunks = async (opts: {
  keywordsForBM25?: string[];
  embeddingsQuery?: string;
}): Promise<ChunkWithScores[]> => {
  // Creates chunks and performs searches with BM25, embeddings, and RRF
  // ...
};
```

- [ ] Understand the workflow: each chunk receives three scores
  - `bm25Score` from keyword matching
  - `embeddingScore` from semantic similarity
  - `rrfScore` from reciprocal rank fusion of both methods

- [ ] Consider which chunk size works best for your use case
  - Smaller chunks (500-1000 characters) may be more precise but less contextual
  - Larger chunks (2000-4000 characters) may provide more context but less precision
  - The optimal size depends on your retrieval goals

- [ ] Experiment with different overlap sizes
  - Larger overlap (200-400 characters) ensures important information isn't split between chunks
  - Smaller overlap (50-100 characters) reduces redundancy but may miss context

- [ ] Prepare for the next exercise where you'll apply final optimizations to this retrieval system
