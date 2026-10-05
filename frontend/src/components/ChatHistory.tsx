import type { Chat } from "../types";
// we're going to reuse our existing component
import AnswerCard from "./AnswerCard";

interface ChatHistoryProps {
  chats: Chat[];
}

function ChatHistory({ chats }: ChatHistoryProps) {
  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="chat-history">
      <h2>Past Questions</h2>
      {chats.map((chat) => (
        <div key={chat._id} className="history-entry">  {/* Give each chat a unique key*/}
          <p className="question-text">Q: {chat.question}</p>
          <AnswerCard answer={chat.answer} sources={chat.sources} />
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
