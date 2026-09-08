import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

interface Source {
  documentId: string;
  chunkText: string;
  score: number;
}

export interface IChat extends MongooseDocument {
  question: string;
  answer: string;
  sources: Source[];
  createdAt: Date;
}
