import { genAI } from "../config/gemini";

const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});
