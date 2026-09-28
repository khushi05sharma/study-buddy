import React, { useState } from "react";
import { createDocument } from "../api/documents";

interface DocumentUploadProps {
  onUploadSuccess: () => void; // Hey App! Upload succeeded. Please refresh the document list.
}

// Create a React component called DocumentUpload and receive its props
function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [title, setTitle] = useState("");
  const [content, SetContent] = useState("");
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
  };
}
