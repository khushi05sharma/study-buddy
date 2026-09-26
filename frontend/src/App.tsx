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

  
}
