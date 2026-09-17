import { apiClient } from "./client";
import type { Chat, Source } from "../types";

interface AskResponse {
  answer: string;
  sources: Source[];
}
