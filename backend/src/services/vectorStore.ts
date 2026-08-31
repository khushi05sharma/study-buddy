import { qdrantClient, COLLECTION_NAME } from "../config/qdrant";
import { randomUUID } from "crypto";

export interface VectorPayload extends Record<string, unknown> {
  documentId: string;
  chunkText: string;
  chunkIndex: number;
}

export const upsertVector = async (
  vector: number[],
  payload: VectorPayload,
): Promise<void> => {
  await qdrantClient.upsert(COLLECTION_NAME, {
    points: [
      {
        id: randomUUID(),
        vector,
        payload,
      },
    ],
  });
};

/**
 * Searches for the most semantically similar chunks to a query vector.
 * Returns the top `limit` matches, each with its original text + score.
 */
export const searchSimilarChunks = async (
  queryVector: number[],
  limit: number = 3,
) => {
  const results = await qdrantClient.query(COLLECTION_NAME, {
    query: queryVector,
    limit,
    with_payload: true,
  });

  return results.points.map((result) => ({
    score: result.score,
    payload: result.payload as unknown as VectorPayload,
  }));
};
