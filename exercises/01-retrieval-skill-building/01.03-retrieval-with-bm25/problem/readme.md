## Steps To Complete

### Setting Up BM25 Search

- [ ] Import the necessary functions and libraries at the top of `api/chat.ts`

```ts
import { generateObject } from 'ai';
import { searchEmails } from './bm25.ts';
import z from 'zod';
```

- [ ] Implement keyword generation inside the `POST` route

```ts
// TODO: Implement a keyword generator that generates a list of keywords
// based on the conversation history. Use generateObject to do this.
const keywords = TODO;
```

- Use `generateObject` with the model you've selected
- Use the `KEYWORD_GENERATOR_SYSTEM_PROMPT` that's already defined at the top of the file
- Define a schema using `z.object` that includes a `keywords` array of strings
- Pass in the conversation messages using `convertToModelMessages(messages)`
- Extract the keywords array from the generated object
- Log the generated keywords to the console so you can see what keywords were generated

- [ ] Implement email search using the generated keywords

```ts
// TODO: Use the searchEmails function to get the top X number of
// search results based on the keywords
const topSearchResults = TODO;
```

- Use the `searchEmails` function from `bm25.ts` with your generated keywords
- Filter the search results to get the top X number of emails (suggested: top 10). Use the `slice` method to get the top X number of emails.
- Consider filtering out results with low relevance scores (e.g., score greater than 0)
- Optionally, log the top search results to see which emails were retrieved

### Testing Your Implementation

- [ ] Test your implementation
  - Run the exercise with `pnpm run dev` and open the local dev server at `localhost:3000`
  - Ask the pre-populated question "What did David say about the mortgage application?"
  - Observe the generated keywords in your terminal
  - Check that the email snippets are being injected into the message history
  - Verify that the LLM is answering based on the retrieved emails
  - Confirm that the LLM is citing its sources using the email subject in markdown format
