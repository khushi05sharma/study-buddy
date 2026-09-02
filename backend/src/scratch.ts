// import { chunkText } from "./services/chunking";

// const sampleText = `
// useEffect allows you to synchronize a component with an external system.
// It runs after the component renders. You can control when it re-runs by
// passing a dependency array. If you pass an empty array, it runs only once,
// similar to componentDidMount in class components. If you omit the array
// entirely, it runs after every render.
// `;

// const result = chunkText(sampleText, {
//   chunkSize: 150,
//   chunkOverlap: 30,
// });

// console.log(JSON.stringify(result, null, 2));


// import dotenv from "dotenv";
// dotenv.config();

// import { generateEmbedding } from "./services/embedding";

// const run = async () => {
//   const vector = await generateEmbedding(
//     "useEffect runs after rendering"
//   );

//   console.log("Vector length:", vector.length);
//   console.log("First 5 values:", vector.slice(0, 5));
// };

// run();


// src/scratch.ts
import dotenv from "dotenv";
dotenv.config();

import { ensureCollection } from "./config/qdrant";
import { generateEmbedding } from "./services/embedding";
import { upsertVector, searchSimilarChunks } from "./services/vectorStore";

const run = async () => {
  await ensureCollection();

  // Store a couple of fake chunks
  const vector1 = await generateEmbedding("useEffect runs after the component renders");
  await upsertVector(vector1, {
    documentId: "test-doc",
    chunkText: "useEffect runs after the component renders",
    chunkIndex: 0,
  });

  const vector2 = await generateEmbedding("MongoDB stores documents in collections");
  await upsertVector(vector2, {
    documentId: "test-doc",
    chunkText: "MongoDB stores documents in collections",
    chunkIndex: 1,
  });

  // Now search with a related question
  const queryVector = await generateEmbedding("When does useEffect execute?");
  const results = await searchSimilarChunks(queryVector, 2);

  console.log(JSON.stringify(results, null, 2));
};

run();