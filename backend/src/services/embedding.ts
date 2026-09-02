import { embeddingModel } from "../config/gemini";

export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
};

/**
 * Converts multiple chunks into embeddings, one by one.
 * We keep this simple (sequential) for now — batching/parallelism
 * is an optimization we can add later once the basic flow works.
 */

export const generateEmbeddings = async (
  texts: string[],
): Promise<number[][]> => {
  const embeddings: number[][] = [];

  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    embeddings.push(embedding);
  }

  return embeddings;
};
