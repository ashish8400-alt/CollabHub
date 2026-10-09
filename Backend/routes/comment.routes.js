import express from "express";

import { createComment , getComments, deleteComment } from "../controllers/comment.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:taskId", authMiddleware, createComment );

router.get("/:taskId", authMiddleware, getComments);

router.delete("/:commentId", authMiddleware, deleteComment  );

export default router;