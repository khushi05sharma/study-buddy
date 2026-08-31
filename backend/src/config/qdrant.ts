import { QdrantClient } from "@qdrant/js-client-rest";

const url = process.env.QDRANT_URL;
const collectionName = process.env.QDRANT_COLLECTION;

if (!url || !collectionName) {
  throw new Error("QDRANT_URL and QDRANT_COLLECTION must be set in .env");
}

export const qdrantClient = new QdrantClient({ url });
export const COLLECTION_NAME = collectionName;

/**
 * Creates the Qdrant collection if it doesn't already exist.
 * Vector size must match your embedding model's output.
 */

export const ensureCollection = async (): Promise<void> => {
  const collections = await qdrantClient.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === COLLECTION_NAME,
  );

  if (!exists) {
    await qdrantClient.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 3072,
        distance: "Cosine",
      },
    });
    console.log(`Qdrant collection "${COLLECTION_NAME}" created`);
  } else {
    console.log(`Qdrant collection "${COLLECTION_NAME}" already exists`);
  }
};

// Method	                     Simple meaning

// new QdrantClient()	         Connect/create client for Qdrant
// getCollections()	           "What collections exist?"
// .some()	                   JS: "Does any item match?"
// createCollection()	         "Create this vector collection"
// upsert()                  	 "Store this vector"
// search()	                   "Find similar vectors"
