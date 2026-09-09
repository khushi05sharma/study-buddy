import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes";
import askRoutes from "./routes/askRoutes";
import chatRoutes from "./routes/chatRoutes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Temporary health-check route — confirms the server is alive

app.get("/api/health", (req, res) => {
  res.json({ message: "Study Buddy API is running" });
});

app.use("/api/documents", documentRoutes);
app.use("/api/ask", askRoutes);
app.use("api/chats", chatRoutes);

export default app;
