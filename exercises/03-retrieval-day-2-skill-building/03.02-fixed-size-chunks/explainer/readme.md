Document chunking is how we break large documents into smaller, manageable pieces for AI systems. But here's the thing - there's no one-size-fits-all approach.

Different documents need different chunking strategies. A technical book requires different handling than a blog post or an email thread. The key is understanding how to split content so that each chunk remains useful and searchable for an [LLM](/PLACEHOLDER/what-is-an-llm).

In this exercise, you'll explore the most straightforward chunking approach: fixed-size token chunking. You'll experiment with a real TypeScript book, adjust parameters, and see how your choices affect what the AI system actually receives.

## Steps To Complete

### Understanding Chunking

- [ ] Understand that chunking is not one-size-fits-all

Different types of documents require different chunking approaches. There's no single perfect chunking algorithm for every situation.

- [ ] Review the document being chunked - the Total TypeScript book

The book is located at `datasets/total-typescript-book.md`. It's a very long piece of markdown that could be used for a MattGPT-style Q&A system about TypeScript.

- [ ] Understand why we can't just pass the entire book into the context window

Passing the entire book would be extremely wasteful of [tokens](/PLACEHOLDER/understanding-tokens). It would provide the [LLM](/PLACEHOLDER/what-is-an-llm) with irrelevant information, likely confusing the model and causing hallucinations.

- [ ] Navigate to `api/chunks.ts` and examine the chunking implementation

We're using the [TokenTextSplitter](/PLACEHOLDER/langchain-token-text-splitter) from [LangChain](/PLACEHOLDER/langchain):

```ts
import { TokenTextSplitter } from '@langchain/textsplitters';

const splitter = new TokenTextSplitter({
  chunkSize: 500,
  chunkOverlap: 200,
});
```

The `chunkSize` parameter controls how many tokens each chunk contains. The `chunkOverlap` parameter ensures that chunks overlap slightly to prevent breaking up important context.

- [ ] Observe the current stats in the top left of the UI

You should see 586 chunks created with an average character length of 1,700 characters. These are relatively long chunks.

- [ ] Review the [LangChain Text Splitters documentation](/PLACEHOLDER/langchain-text-splitters) to understand how `TokenTextSplitter` works

- [ ] Understand the importance of `chunkOverlap`

The 200 token overlap ensures sentences don't get broken off mid-sentence. Look at the UI to see how "thus TypeScript was born" appears at the end of one chunk and at the beginning of the next. This overlap creates some duplication but prevents context loss.

### Experimenting With Chunk Parameters

- [ ] Run the playground using `pnpm run dev`

- [ ] Open your browser at `localhost:3000` to view the chunks

- [ ] Experiment with different `chunkSize` values in `api/chunks.ts`

Try reducing the `chunkSize` to `200` to see how it affects the output:

```ts
const splitter = new TokenTextSplitter({
  chunkSize: 200,
  chunkOverlap: 200,
});
```

Observe how the average character count drops to around 679 characters. Notice how you get more total chunks with smaller sizes.

- [ ] Experiment with different `chunkOverlap` values

Try reducing the `chunkOverlap` to `50` to see how it affects overlaps:

```ts
const splitter = new TokenTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});
```

Look at examples like "This was especially true for refactoring code" appearing in consecutive chunks. Notice how smaller overlaps create less duplication.

- [ ] Use the search functionality to find specific topics

Try searching for "generics" to see which chunks contain that term. Observe how some chunks may cross chapter boundaries.

- [ ] Evaluate each chunk as if you were a search algorithm

Ask yourself: "What query would this chunk be useful for?" Look at chunks about TypeScript's foundations and beginnings. Consider whether the chunk provides coherent, searchable information.

- [ ] Identify weaknesses in the fixed-size chunking approach

Note chunks that cross chapter boundaries inappropriately. Look for chunks that split conceptually related information. Consider how chunk boundaries might break semantic meaning.

- [ ] Think about how you might improve the chunking strategy

Consider preserving chapter or section boundaries. Think about keeping related concepts together. Imagine alternative approaches that might create more semantically meaningful chunks.
