import mongoose, {
  Schema,
  Document as MongooseDocument,
  model,
} from "mongoose";

export interface IDocument extends MongooseDocument {
  title: string;
  content: string;
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IDocument>("Document", DocumentSchema);
