import { Request, Response } from "express";
import DocumentModel from "../models/Document";

export const CreateDocument = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }

    const newDocument = await DocumentModel.create({ title, content });
    return res.status(201).json(newDocument);
  } catch (err) {
    console.error("Error creating document:", err);
    return res.status(500).json({ error: "Failed to create document" });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await DocumentModel.find().sort({ createdAt: -1 });
    return res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({ error: "Failed to fetch documents" });
  }
};
