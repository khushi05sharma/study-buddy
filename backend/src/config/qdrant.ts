import { QdrantClient } from "@qdrant/js-client-rest";

const url = process.env.QDRANT_URL;
const collectionName = process.env.QDRANT_COLLECTION;

if (!url || !collectionName) {
  throw new Error("QDRANT_URL and QDRANT_COLLECTION must be set in .env");
}
