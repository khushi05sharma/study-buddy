// purpose is to give the frontend previous conversations

import { Request, Response } from "express";
import ChatModel from "../models/Chat";

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    // Find chat records in MongoDB.Sort by newest first.Don't return more than 50 chat records.
    const chats = await ChatModel.find().sort({ createdAt: -1 }).limit(50);

    return res.status(200).json(chats);
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
