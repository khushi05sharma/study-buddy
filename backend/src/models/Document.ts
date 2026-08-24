import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  content: string;
  createdAt: Date;
}
