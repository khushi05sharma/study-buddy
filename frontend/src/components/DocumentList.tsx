// Receive the documents from App and display them.
import type { StudyDocument } from "../types";

interface DocumentListProps {
  documents: StudyDocument[]; // just receives data — never fetches it itself
}

function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return <p className="muted-text">No documents uploaded yet.</p>;
  }

  return (
    <div className="card">
      <h2>My Documents</h2>
      <ul className="document-list">
        {documents.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.title}</strong>
            <span className="muted-text">
              {" "}
              — {new Date(doc.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentList;
