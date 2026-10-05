import type { Chat } from "../types";
// we're going to reuse our existing component
import AnswerCard from "./AnswerCard";

interface ChatHistoryProps {
  chats: Chat[];
}
