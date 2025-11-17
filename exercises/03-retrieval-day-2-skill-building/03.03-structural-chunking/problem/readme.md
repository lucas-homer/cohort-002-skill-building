## Steps To Complete

### Understanding Structural Chunking

- [ ] Understand that structural chunking respects the internal structure of documents
  - Fixed size chunking splits text arbitrarily without considering section headers or document organization
  - Structural chunking uses separators to split documents at meaningful boundaries like headings, code blocks, and chapter markers
  - This groups related information together and creates more semantically coherent chunks

- [ ] Review the `RecursiveCharacterTextSplitter` from LangChain
  - `chunkSize` and `chunkOverlap` refer to numbers of characters instead of tokens
  - The `separators` array defines where the algorithm is allowed to split the document
  - The splitter tries separators in order, only splitting at these designated spots

- [ ] Navigate to `problem/api/chunks.ts` and locate the `RecursiveCharacterTextSplitter` configuration

```ts
const splitter = new RecursiveCharacterTextSplitter({
  // TODO: Set chunk size and overlap
  chunkSize: 1000,
  chunkOverlap: 100,
  separators: [
    // TODO: Add separators for headings (not including h1's)
    '\n## ',
    // TODO: Add separators for code blocks

    // TODO: Add separators for chapter markers (e.g., "--- CHAPTER ---")

    '\n\n',
  ],
});
```

- [ ] Run the application using `pnpm run dev` to see the current chunking behavior

- [ ] Open your browser to `localhost:3000` to view the chunks
  - Notice how chunks are split only at the `\n## ` heading separator and `\n\n` double newlines
  - The chunks may look somewhat small due to the `chunkSize: 1000` setting
  - Some chunks may contain content that should be split differently

### Adding Separators

- [ ] Add separators for all heading levels (except h1's which use `# `)

```ts
separators: [
  '\n## ',
  '\n### ',
  '\n#### ',
  '\n##### ',
  '\n###### ',
  // ... other separators
],
```

- [ ] Add separators for code blocks to prevent them from being split mid-block

````ts
separators: [
  // ... heading separators
  '```\n\n',
  // ... other separators
],
````

- [ ] Add separators for chapter markers in the book

```ts
separators: [
  '\n--- CHAPTER ---\n',
  // ... other separators
],
```

- [ ] Add separators for horizontal lines (which may also denote section breaks)

```ts
separators: [
  // ... other separators
  '\n\n***\n\n',
  '\n\n---\n\n',
  '\n\n___\n\n',
  // ... other separators
],
```

### Tuning And Testing

- [ ] Adjust the `chunkSize` to create appropriately sized chunks
  - The current `1000` character setting may be too small
  - Try increasing to `2000` characters for more substantial chunks
  - Observe how this affects the chunk distribution in the browser

- [ ] Adjust the `chunkOverlap` to ensure continuity between chunks
  - Increase from `100` to around `200` characters
  - This helps preserve context across chunk boundaries
  - Too little overlap may lose important context; too much creates unnecessary duplication

- [ ] Review the chunks in the browser at `localhost:3000`
  - Use the search functionality to find specific content (e.g., "TypeScript beginnings")
  - Check that related content stays together (e.g., a heading with its following paragraphs)
  - Verify that chapter markers properly separate major sections
  - Ensure code blocks aren't split in the middle

- [ ] Use the pagination controls to browse through different chunks
  - Observe the stats bar showing total chunks, average character count, and current page
  - Notice how the chunk boundaries align with meaningful document structure

- [ ] Experiment with different separator orderings
  - The order matters: separators earlier in the array are tried first
  - Chapter markers should typically come before headings
  - Headings should come before paragraph breaks
  - The final separators (`\n`, ` `, `''`) act as fallbacks

- [ ] Fine-tune the configuration until you achieve well-structured, searchable chunks
  - Chunks should contain coherent, related information
  - Important delimiters like headings should align with chunk boundaries
  - The average chunk size should be appropriate for your use case
