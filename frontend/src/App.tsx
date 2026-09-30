import { useState, useEffect } from "react";
import type { StudyDocument } from "./types";
import { getDocuments } from "./api/documents";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";