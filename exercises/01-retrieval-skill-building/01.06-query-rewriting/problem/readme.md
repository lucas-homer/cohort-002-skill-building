## Steps To Complete

### Implementing Query Rewriting

- [ ] Understand that query rewriting transforms user input into optimized queries for different search algorithms
  - BM25 works best with specific keywords and exact terminology
  - Semantic search works better with broader, more conceptual queries
  - The same user question needs to be rewritten differently for each search method

- [ ] Navigate to `api/chat.ts` and locate the `generateObject` call with the TODO comment

```ts
// TODO: Change the generateObject call so that it generates a search query in
// addition to the keywords. This will be used for semantic search, which will be a
// big improvement over passing the entire conversation history.
const keywords = await generateObject({
  model: google('gemini-2.5-flash'),
  system: `You are a helpful email assistant, able to search emails for information.
    Your job is to generate a list of keywords which will be used to search the emails.
  `,
  schema: z.object({
    keywords: z
      .array(z.string())
      .describe(
        'A list of keywords to search the emails with. Use these for exact terminology.',
      ),
  }),
  messages: convertToModelMessages(messages),
});
```

- [ ] Update the system prompt to explain that the LLM should generate both keywords and a search query
  - Add information about generating a search query for semantic search
  - Explain that the search query can be more general than the keywords

- [ ] Add a `searchQuery` field to the schema object

```ts
schema: z.object({
  keywords: z
    .array(z.string())
    .describe(
      'A list of keywords to search the emails with. Use these for exact terminology.',
    ),
  // Add searchQuery field here
}),
```

- [ ] Use `z.string()` to define the `searchQuery` field type

- [ ] Add a `.describe()` call to explain that this query will be used for semantic search and can use broader terms

- [ ] Locate the `searchEmails` function call in `api/chat.ts`

```ts
const searchResults = await searchEmails({
  keywordsForBM25: keywords.object.keywords,
  embeddingsQuery: TODO,
});
```

- [ ] Pass `keywords.object.searchQuery` as the `embeddingsQuery` parameter
  - This sends the generated search query to the semantic search algorithm
  - The keywords will be used for BM25, while the search query will be used for embeddings

### Testing Your Implementation

- [ ] Run the application using `pnpm run dev`
  - Wait for "Embedding Emails" and "Embedding complete" messages
  - The server will start on localhost:3000

- [ ] Open your browser to `localhost:3000`

- [ ] Test with the default query "What did David say about the mortgage application?"

- [ ] Check the browser console to see the generated keywords and search query
  - Look for the logged `keywords.object` which will show both fields
  - Verify that the keywords are specific terms from the conversation
  - Verify that the search query is a broader, more semantic version

- [ ] Check which email IDs were returned in the console
  - The top 5 results should be relevant to David and mortgage applications
  - The combination of BM25 and semantic search should provide better results than either alone

- [ ] Try different queries to test the query rewriting
  - Try "What properties was Sarah interested in?"
  - Try "Tell me about the house hunting process"
  - Observe how the LLM generates different keywords versus search queries for each

- [ ] Add a console log to see the difference between keywords and search query

```ts
console.log('Keywords:', keywords.object.keywords);
console.log('Search Query:', keywords.object.searchQuery);
```

- [ ] Verify that the AI assistant answers questions accurately using the retrieved emails
  - Check that sources are cited using markdown links to email subjects
  - Confirm that the answers are based on the retrieved email content
