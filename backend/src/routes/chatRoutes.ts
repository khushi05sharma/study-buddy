import { Router } from "express";
import { getChatHistory } from "../controllers/chatController";

const router = Router();

router.get("/", getChatHistory);

export default router;
