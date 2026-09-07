// When someone sends a POST request to this endpoint, use askQuestion

import { Router } from "express";
import { askQuestion } from "../controllers/askController";

const router = Router();

router.post("/", askQuestion);

export default router;
