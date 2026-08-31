import { qdrantClient, COLLECTION_NAME } from "../config/qdrant";
import { randomUUID } from "crypto";

export interface vectorPayload {
    documentId : number;
    chunkText: string;
    chunkIndex: number;
}