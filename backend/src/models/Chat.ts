import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

interface Source {
  documentId: string;
  chunkText: string;
  score: number;
}
