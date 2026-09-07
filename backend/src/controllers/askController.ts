import { Request, Response } from "express";
import { answerQuestion } from "../services/rag";

export const askQuestion = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    const answer = await answerQuestion(question);

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Error answering question:", err);
    return res.status(500).json({ error: "Failed to answer question" });
  }
};
