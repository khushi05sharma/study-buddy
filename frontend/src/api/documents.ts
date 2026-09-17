// we're not importing Axios directly here. We're importing our configured Axios instance.
import { apiClient } from "./client";
import type { StudyDocument } from "../types";

// This function will eventually give an array of StudyDocument objects.
export const getDocuments = async (): Promise<StudyDocument[]> => {
  const response = await apiClient.get<StudyDocument[]>("/documents");

  return response.data;
};

export const createDocument = async (
  title: string,
  content: string,
): Promise<StudyDocument> => {
  // Send this data to /documents using POST.
  const response = await apiClient.post<StudyDocument>("/documents", {
    title,
    content,
  });

  return response.data;
};

// apiClient.get<StudyDocument[]> -- meaning | Backend, I'm calling /documents. I expect the JSON data you're sending back to look like an array of StudyDocument objects.
