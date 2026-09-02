import { chunkText } from "./chunking";
import { generateEmbeddings } from "./embedding";
import { upsertVector } from "./vectorStore";

/**
 * Takes a saved document's content, chunks it, embeds each chunk,
 * and stores each chunk's vector in Qdrant — tagged with the document's ID
 * so we always know which document a retrieved chunk came from.
 */

export const processDocument = async (
  documentId: string,
  content: string,
): Promise<void> => {
  const chunks = chunkText(content, { chunkSize: 500, chunkOverlap: 50 });
  const texts = chunks.map((c) => c.text);
  const vector = await generateEmbeddings(texts);
};
