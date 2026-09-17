import { apiClient } from "./client";
import type { Chat, Source } from "../types";

interface AskResponse {
  answer: string;
  sources: Source[];
}

// Take the user's question → send it to our backend → give back the answer and sources.
export const askQuestion = async (question: string): Promise<AskResponse> => {
  const response = await apiClient.post<AskResponse>("/ask", { question });

  return response.data;
};

// Create a function that gets the user's previous chats and eventually
// returns an array of Chat objects.
export const getChatHistory = async (): Promise<Chat[]> => {
  const response = await apiClient.get<Chat[]>("/chats");

  return response.data;
};
