import { text } from "node:stream/consumers";
import { genAI } from "../config/gemini";

// calling the getGenerativeModel() method to get the text embedding model
const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

/**
 * Converts a single piece of text into an embedding vector.
 * Returns an array of numbers representing the text's meaning.
 */

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
