import { useState, useEffect } from "react";
import type { StudyDocument } from "./types";
import { getDocuments } from "./api/documents";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";

function App() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]);

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("failed to fetch documents:", err);
    }
  };
}
