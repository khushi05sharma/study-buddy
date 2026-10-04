import { useState } from "react";
import { askQuestion } from "../api/chats";
import type { Source } from "../types";

interface AskPanelProps {
  // onAnswerReceived is a function that accepts two arguments:
  //answer → a string & sources → an array of Source objects : and it doesn't return anything.
  onAnswerReceived: (answer: string, sources: Source[]) => void;
}

function AskPanel({ onAnswerReceived }: AskPanelProps) {}
