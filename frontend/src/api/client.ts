// Fetch: fetch(`${API_BASE_URL}/documents`) → Axios: apiClient.get("/documents")
// both make HTTP requests; Axios gives us a configured client + simpler syntax.

import axios from "axios";
// it is like creating our own Study Buddy HTTP client.
export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
