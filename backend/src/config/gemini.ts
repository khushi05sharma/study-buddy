import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Used in embedding.ts for vectors
export const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

// Used in rag.ts for generating the final answer
export const chatModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
