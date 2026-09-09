import { generateEmbedding } from "./embedding";
import { searchSimilarChunks } from "./vectorStore";
import { chatModel } from "../config/gemini";

interface RagResult {
  answer: string;
  sources: {
    documentId: string;
    chunkText: string;
    score: number;
  }[];
}

export const answerQuestion = async (question: string): Promise<RagResult> => {
  // turn the question into a vector
  const queryvector = await generateEmbedding(question);
  // search Qdrant & retrieve the most relevant chunks
  const matches = await searchSimilarChunks(queryvector, 3);

  if (matches.length === 0) {
    return {
      answer: "I don't have any study material to answer that yet.",
      sources: [],
    };
  }

  // build the context block from retrieved chunks
  // m = current match , i = current index
  const contextText = matches
    .map((m, i) => `Chunk ${i + 1}:\n${m.payload.chunkText}`)
    .join("\n\n");

  const prompt = `You are a helpful study assistant. Answer the question using ONLY the study material below. If the answer isn't in the material, say you don't know.

STUDY MATERIAL:
${contextText}

QUESTION:
${question}

ANSWER:`;

  const result = await chatModel.generateContent(prompt);
  const answer = result.response.text();

  const sources = matches.map((m) => ({
    documentId: m.payload.documentId,
    chunkText: m.payload.chunkText,
    score: m.score,
  }));

  return { answer, sources };
};
