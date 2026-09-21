import express from "express";


import authMiddleware from "../middleware/auth.middleware.js";
import { createProject, getMyProjects, getSingleProject, updateProject } from "../controllers/project.controller.js";


const router = express.Router();

router.post("/create", authMiddleware, createProject);
router.get("/my-projects", authMiddleware, getMyProjects);
router.get( "/:projectId", authMiddleware,
    getSingleProject
);
router.put("/:projectId", authMiddleware, updateProject);



export default router;