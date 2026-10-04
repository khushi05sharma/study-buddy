import React, { useState, type FormEvent } from "react";
import { askQuestion } from "../api/chats";
import type { Source } from "../types";

interface AskPanelProps {
  // onAnswerReceived is a function that accepts two arguments:
  //answer → a string & sources → an array of Source objects : and it doesn't return anything.
  onAnswerReceived: (answer: string, sources: Source[]) => void;
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
  };
}
