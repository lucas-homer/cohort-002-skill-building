So far, we've been making a dangerous assumption about the data flowing into our retrieval system. We've assumed that all documents—whether emails, notes, or reports—would be roughly the same size.

In reality, that's not how it works. Some documents are just a few paragraphs, but others are the size of novels. When you pull a large document through a retrieval algorithm, it dominates the [context window](https://www.aihero.dev/what-is-the-context-window).

Even if relevant information exists in there, you're giving the LLM a needle-in-a-haystack problem. We need a strategy to handle these large documents. That strategy is **chunking**.

## Steps To Complete

- [ ] Review how chunking solves the context window problem

Understand that large documents can overwhelm LLMs by filling the context window with irrelevant information.

Different chunking strategies exist for different situations:

- **Fixed-size chunking**: Split at regular intervals (e.g., 1000 characters)
- **Semantic chunking**: Split by meaning and topic boundaries
- **Hierarchical chunking**: Multi-level splits for nested structure
- **Overlap-based chunking**: Chunks that share content for context

- [ ] Explore different chunking strategies

Research how each approach works and when to use them. Consider how fixed-size chunking might split sentences awkwardly, while [semantic chunking](https://docs.langchain.com/oss/python/integrations/splitters) respects topic boundaries.

- [ ] Implement chunking in your retrieval system

Apply chunking to your document pipeline so large documents are split before [embedding](https://ai-sdk.dev/docs/ai-sdk-core/embeddings#embeddings).

```ts
// TODO: Implement the chunking logic
// This should take a large document and split it into chunks
// before they get embedded
const chunks = chunkDocument(largeDocument, strategy);
```

- [ ] Test your chunking with a large document

Verify that your system can now handle documents of various sizes and successfully retrieve relevant chunks. Try with documents that range from a few paragraphs to several pages.

- [ ] Measure retrieval quality after implementing chunking

Compare your results before and after chunking to confirm that relevant information is easier to find in the context window.

Document what you observe about search accuracy and relevance with your new chunked system.
