export interface StudyDocument {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Source {
  documentId: string;
  chunkText: string;
  score: number;
}
