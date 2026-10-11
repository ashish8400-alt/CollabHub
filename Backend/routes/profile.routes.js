
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadProfileImage } from "../controllers/profile.controller.js";

const router = express.Router();

router.put(
    "/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

export default router;

