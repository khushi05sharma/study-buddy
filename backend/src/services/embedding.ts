import { text } from "node:stream/consumers";
import { genAI } from "../config/gemini";

// calling the getGenerativeModel() method to get the text embedding model
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
};

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
