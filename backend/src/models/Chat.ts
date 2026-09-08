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

const ChatSchema = new Schema<IChat>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  sources: [
    {
      documentId: String,
      chunkText: String,
      score: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IChat>("Chat", ChatSchema);
