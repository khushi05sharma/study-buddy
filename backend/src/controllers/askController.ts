import { Request, Response } from "express";
import { answerQuestion } from "../services/rag";
import ChatModel from "../models/Chat";

export const askQuestion = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    const { answer, sources } = await answerQuestion(question);

    // Save the exchange for history — non-blocking for the response itself,
    // but awaited here for simplicity while we're still learning the flow
    await ChatModel.create({ question, answer, sources });

    return res.status(200).json({ answer, sources });
  } catch (err) {
    console.error("Error answering question:", err);
    return res.status(500).json({ error: "Failed to answer question" });
  }
};
