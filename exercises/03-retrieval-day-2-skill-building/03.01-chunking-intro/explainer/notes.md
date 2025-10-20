# Chunking Intro

## Learning Goals

- Understand why emails/pre-chunked data doesn't need chunking but irregular docs do
- Identify problem: large chunks dominate context window, crowd out other results
- Recognize wasteful info issue: fixed chunks may contain irrelevant sections
- Learn solution: chunk docs into regular sizes for balanced retrieval
- Preview two approaches: fixed-size (token-based) vs structural (markdown-based)

## Steps To Complete

### Visualize the Problem

Demo script showing why chunking needed:

```ts
import { readFileSync } from 'fs';
import path from 'path';

// Load irregular dataset (TypeScript book)
const bookText = readFileSync(
  path.join(
    import.meta.dirname,
    '../../../datasets/total-typescript-book.md',
  ),
  'utf-8',
);

// TODO: Calculate and log total document length in chars
console.log(`Total doc length: ${TODO} chars`);

// TODO: Split by markdown sections (## headers) naively
const sections = TODO;

// TODO: Log length distribution showing problem
// Some sections will be 100 chars, others 10,000+ chars
sections.forEach((section, i) => {
  console.log(`Section ${i + 1}: ${section.length} chars`);
});
```

**Notes:**

- Show how irregular docs have wildly varying section lengths
- Large sections dominate context window when retrieved
- 8k context can fit 1 giant section OR 20 small sections
- Retrieval becomes unfair: small relevant sections get crowded out

### Explain Context Window Problem

Without chunking, retrieving one 5000-char section uses same "slot" as five 1000-char sections. This creates:

- Imbalanced retrieval: large irrelevant sections beat small relevant ones
- Context waste: LLM gets 1-2 massive docs instead of diverse results
- Ranking issues: BM25/embeddings can't compare fairly across size disparities

### Introduce Chunking Solutions

Two main approaches to solve this:

**Fixed-size chunking** (03.02):

- Split by token count (e.g., 300 tokens per chunk)
- Add overlap (e.g., 50 tokens) to preserve boundary context
- Simple, predictable, works for any text
- Trade-off: may split mid-thought, includes some wasteful text

```ts
// Preview: TokenTextSplitter approach
import { TokenTextSplitter } from '@langchain/textsplitters';

const splitter = new TokenTextSplitter({
  chunkSize: 300,
  chunkOverlap: 50,
});

// TODO: Split document into fixed chunks
const chunks = await splitter.splitText(bookText);

// TODO: Verify all chunks roughly same size
console.log(`Created ${chunks.length} chunks`);
chunks.slice(0, 5).forEach((chunk, i) => {
  console.log(`Chunk ${i + 1}: ${chunk.length} chars`);
});
```

**Structural chunking** (03.04):

- Split by document structure (markdown headings, sections)
- Respects semantic boundaries
- Less wasteful: each chunk is self-contained concept
- Requires structured input (markdown, HTML, etc.)

### Compare Before/After

Demonstrate improvement:

**Before chunking:**

- Query: "What is TypeScript's type system?"
- Retrieved: 1 massive 8000-char chapter (drowns context)

**After chunking:**

- Query: "What is TypeScript's type system?"
- Retrieved: 8-10 focused 500-800 char chunks from different sections
- More diverse, relevant results fit in same context window

**Notes:**

- Chunking enables rank fusion across document pieces
- Each chunk can be embedded/scored independently
- Reranking step (03.05) filters best chunks from top 30

### Foundation for Upcoming Lessons

This intro sets up:

- 03.02: Implement fixed-size chunking with TokenTextSplitter
- 03.03: Integrate chunks with BM25 + embeddings + RRF
- 03.04: Replace fixed-size with structural chunking
- 03.05: Add reranking to filter best chunks

**Key insight:** Chunking isn't about the algorithm—it's about creating fair, balanced retrieval where relevance (not size) determines what LLM sees.
