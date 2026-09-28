//    collect study material from the user → send it to backend → tell the parent that upload succeeded.

import React, { useState } from "react";
import { createDocument } from "../api/documents";

interface DocumentUploadProps {
  onUploadSuccess: () => void; // Hey App! Upload succeeded. Please refresh the document list.
}

// Create a React component called DocumentUpload and receive its props
function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // createDocument() internally does: apiClient.post("/documents", {...})
      await createDocument(title, content);
      setTitle("");
      setContent("");
      onUploadSuccess(); // tell App: "go refresh the list"
    } catch (err) {
      console.error(err);
      setError("Failed to upload document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Study Notes</h2>
      <input
        type="text"
        placeholder="Title (e.g. React Hooks Notes)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
      />

      <textarea
        placeholder="Paste your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        disabled={isSubmitting}
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

export default DocumentUpload;
