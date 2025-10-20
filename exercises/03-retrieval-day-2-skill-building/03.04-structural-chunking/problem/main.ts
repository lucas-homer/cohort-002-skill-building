import {
  MarkdownTextSplitter,
  TokenTextSplitter,
} from '@langchain/textsplitters';
import { readFileSync } from 'fs';
import path from 'path';
import { styleText } from 'util';

const splitter = new MarkdownTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const bookText = readFileSync(
  path.join(
    import.meta.dirname,
    '../../../../datasets/total-typescript-book.md',
  ),
  'utf-8',
);

const chunks = await splitter.splitText(bookText);

// Show 3 random chunks
for (let i = 0; i < 3; i++) {
  const randomIndex = Math.floor(Math.random() * chunks.length);
  const chunk = chunks[randomIndex]!;
  console.log(
    styleText(['bold', 'yellow'], `Chunk ${randomIndex + 1}:`),
  );
  console.log('');
  console.log(chunk.trim());
  console.log('');
}

console.log(`Number of chunks:`, chunks.length);
console.log(
  'Average chunk length in characters:',
  Math.round(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0) /
      chunks.length,
  ),
);
