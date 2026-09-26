import { useEffect, useState } from "react";
import { getDocuments } from "./api/documents";
import type { StudyDocument } from "./types";

function App() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };
    loadDocuments();
  }, []);

  return (
    <div>
      <h1>Study Buddy</h1>

      <h2>Documents</h2>

      {documents.map((document) => (
        <div key={document._id}>
          <h3>{document.title}</h3>
          <p>{document.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
