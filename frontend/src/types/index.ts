// define the shape of the data our frontend expects from the backend

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

export interface Chat {
  _id: string;
  question: string;
  answer: string;
  sources: Source[];
  createdAt: string;
}
