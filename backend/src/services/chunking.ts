export interface chunk {
  text: string;
  index: number;
}

interface chunkOptions {
  chunkSize?: number; // max characters per chunk
  chunkOverlap?: number; // characters shared between consecutive chunks
}
