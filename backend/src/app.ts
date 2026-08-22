import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());

// Temporary health-check route — confirms the server is alive

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "study-buddy backend is running fine!!" });
});

export default app;