// Ask the question and hand the result to APP
import React, { useState } from "react";
import { askQuestion } from "../api/chats";
import type { Source } from "../types";

interface AskPanelProps {
  // onAnswerReceived is a function that accepts two arguments:
  //answer → a string & sources → an array of Source objects : and it doesn't return anything.
  onAnswerReceived: (
    question: string,
    answer: string,
    sources: Source[],
  ) => void;
}

function AskPanel({ onAnswerReceived }: AskPanelProps) {
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("please written a question");
      return;
    }

    setIsAsking(true);
    setError(null);

    try {
      const { answer, sources } = await askQuestion(question);

      onAnswerReceived(question, answer, sources); // hand the result up to App
      setQuestion("");
    } catch (err) {
      console.error(err);
      setError("Failed to get an answer. Please try again.");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Ask Your Notes</h2>

      <input
        type="text"
        placeholder="e.g. What is useEffect used for?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={isAsking}
      />

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={isAsking}>
        {isAsking ? "Thinking..." : "Ask"}
      </button>
    </form>
  );
}

export default AskPanel;
