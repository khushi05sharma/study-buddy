import { apiClient } from "./client";
import type { Chat, Source } from "../types";

interface AskResponse {
  answer: string;
  sources: Source[];
}

export const askQuestion = async (question: string): Promise<AskResponse> => {
  const response = await apiClient.post<AskResponse>("/ask", { question });

  return response.data;
};
