## Steps To Complete

### Understanding Chunking

- [ ] Understand that chunking is not one-size-fits-all
  - Different types of documents require different chunking approaches
  - There's no single perfect chunking algorithm for every situation

- [ ] Review the document being chunked - the Total TypeScript book
  - The book is located at `datasets/total-typescript-book.md`
  - It's a very long piece of markdown that could be used for a MattGPT-style Q&A system about TypeScript

- [ ] Understand why we can't just pass the entire book into the context window
  - It would be extremely wasteful of tokens
  - It would provide the LLM with irrelevant information
  - It would likely confuse the model and cause hallucinations

- [ ] Navigate to `api/chunks.ts` and examine the chunking implementation

```ts
import { TokenTextSplitter } from '@langchain/textsplitters';

const splitter = new TokenTextSplitter({
  chunkSize: 500,
  chunkOverlap: 200,
});
```

- [ ] Observe the current stats in the top left of the UI
  - 586 chunks created
  - Average character length of 1,700 characters
  - Chunks are relatively long

- [ ] Review the [LangChain Text Splitters documentation](https://js.langchain.com/docs/modules/data_connection/document_transformers/) to understand how `TokenTextSplitter` works

- [ ] Understand the importance of `chunkOverlap`
  - The 200 token overlap ensures sentences don't get broken off mid-sentence
  - Look at the UI to see how "thus TypeScript was born" appears at the end of one chunk and beginning of the next
  - This overlap creates some duplication but prevents context loss

### Experimenting With Chunk Parameters

- [ ] Run the playground using `pnpm run dev`

- [ ] Open your browser at `localhost:3000` to view the chunks

- [ ] Experiment with different `chunkSize` values in `api/chunks.ts`
  - Try reducing the `chunkSize` to `200` to see how it affects the output
  - Observe how the average character count drops to around 679 characters
  - Notice how you get more total chunks with smaller sizes

- [ ] Experiment with different `chunkOverlap` values
  - Try reducing the `chunkOverlap` to `50` to see how it affects overlaps
  - Look at examples like "This was especially true for refactoring code" appearing in consecutive chunks
  - Notice how smaller overlaps create less duplication

- [ ] Use the search functionality to find specific topics
  - Try searching for "generics" to see which chunks contain that term
  - Observe how some chunks may cross chapter boundaries

- [ ] Evaluate each chunk as if you were a search algorithm
  - Ask yourself: "What query would this chunk be useful for?"
  - Look at chunks about TypeScript's foundations and beginnings
  - Consider whether the chunk provides coherent, searchable information

- [ ] Identify weaknesses in the fixed-size chunking approach
  - Note chunks that cross chapter boundaries inappropriately
  - Look for chunks that split conceptually related information
  - Consider how chunk boundaries might break semantic meaning

- [ ] Think about how you might improve the chunking strategy
  - Consider preserving chapter or section boundaries
  - Think about keeping related concepts together
  - Imagine alternative approaches that might create more semantically meaningful chunks
