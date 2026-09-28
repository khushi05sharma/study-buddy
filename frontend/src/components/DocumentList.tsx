import type { StudyDocument } from "../types";

interface DocumentListProps {
  documents: StudyDocument[]; // just receives data — never fetches it itself
}

function DocumentList ({documents} : DocumentListProps){
    if (documents.length === 0) {
    return <p className="muted-text">No documents uploaded yet.</p>;
  }
}