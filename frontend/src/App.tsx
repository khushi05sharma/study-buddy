import { useEffect, useState } from "react";
import type { StudyDocument, Source, Chat } from "./types";
import { getDocuments } from "./api/documents";
import { getChatHistory } from "./api/chats";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";
import AskPanel from "./components/AskPanel";
import AnswerCard from "./components/AnswerCard";
import ChatHistory from "./components/ChatHistory";

interface CurrentAnswer {
  answer: string;
  sources: Source[];
}

function App() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]); // Our state will contain an array of StudyDocument objects.
  const [currentAnswer, setCurrentAnswer] = useState<CurrentAnswer | null>(
    null,
  );
  const [chatHistory, setChatHistory] = useState<Chat[]>([]); // App owns an array containing all the previous Q&A entries.

  // Get the latest documents from the backend and put them into React state.
  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const data = await getChatHistory();
      setChatHistory(data);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchChatHistory();
  }, []);

  const handleAnswerReceived = (
    question: string,
    answer: string,
    sources: Source[],
  ) => {
    setCurrentAnswer({ answer, sources }); // "This is the latest answer. Show it in the main AnswerCard."

    // manually creating an object that follows Chat interface.
    const newChatEntry: Chat = {
      _id: crypto.randomUUID(), // temporary unique ID on the frontend
      question,
      answer,
      sources,
      createdAt: new Date().toISOString(),
    };

    setChatHistory((prev) => [newChatEntry, ...prev]); // Take whatever the latest previous state is, and add this new item to it.
  };

  return (
    <div className="app-container">
      <h1>📚 Study Buddy</h1>
      {/* DocumentUpload, when you successfully upload something, call this function. */}
      <DocumentUpload onUploadSuccess={fetchDocuments} />
      <DocumentList documents={documents} />

      <AskPanel onAnswerReceived={handleAnswerReceived} />

      {currentAnswer && (
        <AnswerCard
          answer={currentAnswer.answer}
          sources={currentAnswer.sources}
        />
      )}

      <ChatHistory chats={chatHistory} />
    </div>
  );
}

export default App;
