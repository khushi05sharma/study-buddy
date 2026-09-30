import { useState, useEffect } from "react";
import type { StudyDocument } from "./types";
import { getDocuments } from "./api/documents";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";

function App() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]); // Our state will contain an array of StudyDocument objects.

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

  return (
    <div className="app-container">
      <h1>📚 Study Buddy</h1>
      //DocumentUpload, when you successfully upload something, call this
      function.
      <DocumentUpload onUploadSuccess={fetchDocuments} />
      <DocumentList documents={documents} />
    </div>
  );
}

export default App;
