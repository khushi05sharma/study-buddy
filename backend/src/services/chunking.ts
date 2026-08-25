export interface Chunk {
  text: string;
  index: number;
}

interface ChunkOptions {
  chunkSize?: number; // max characters per chunk
  chunkOverlap?: number; // characters shared between consecutive chunks
}

export const chunkText = (
  text: string,
  options: ChunkOptions = {},
): Chunk[] => {
  const { chunkSize = 500, chunkOverlap = 50 } = options;

  if (chunkOverlap >= chunkSize) {
    throw new Error("chunkOverlap must be smaller than chunkSize");
  }

  const cleanedText = text.trim().replace(/\s+/g, " ");
  const chunks: Chunk[] = [];

  let startIndex = 0;
  let chunkIndex = 0;

  while (startIndex < cleanedText.length) {
    const endIndex = Math.min(startIndex + chunkSize, cleanedText.length);
    const chunkText = cleanedText.slice(startIndex, endIndex);

    chunks.push({
      text: chunkText,
      index: chunkIndex,
    });

    chunkIndex++;

    // Move the window forward, but overlap with the previous chunk
    startIndex += chunkSize - chunkOverlap;
  }

  return chunks;
};
