
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadProfileImage ,getMyProfile , updateMyProfile , changePassword } from "../controllers/profile.controller.js";

const router = express.Router();

router.put("/image", authMiddleware, upload.single("profileImage"),uploadProfileImage );


router.get("/me", authMiddleware, getMyProfile);

router.put("/me", authMiddleware, updateMyProfile);

router.put("/change-password", authMiddleware, changePassword);


export default router;

