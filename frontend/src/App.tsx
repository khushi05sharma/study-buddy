import { useState, useEffect } from "react";
import type { StudyDocument, Source } from "./types";
import { getDocuments } from "./api/documents";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";
import AskPanel from "./components/AskPanel";
import AnswerCard from "./components/AnswerCard";

interface CurrentAnswer {
  answer: string;
  sources: Source[];
}

function App() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]); // Our state will contain an array of StudyDocument objects.
  const [currentAnswer, setCurrentAnswer] = useState<CurrentAnswer | null>(
    null,
  );

  // Get the latest documents from the backend and put them into React state.
  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("failed to fetch documents:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleAnswerReceived = (answer: string, sources: Source[]) => {
    setCurrentAnswer({ answer, sources });
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
    </div>
  );
}

export default App;
