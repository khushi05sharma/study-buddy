import { useState } from "react";
import { createDocument } from "../api/documents";

interface DocumentUploadProps {
  onUploadSuccess: () => void; // Hey App! Upload succeeded. Please refresh the document list.
}