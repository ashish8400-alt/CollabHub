import express from "express";


import authMiddleware from "../middleware/auth.middleware.js";
import { createProject, getMyProjects, getSingleProject, updateProject, deleteProject } from "../controllers/project.controller.js";


const router = express.Router();

router.post("/create", authMiddleware, createProject);
router.get("/my-projects", authMiddleware, getMyProjects);
router.get( "/:projectId", authMiddleware,
    getSingleProject
);
router.put("/:projectId", authMiddleware, updateProject);
router.delete("/:projectId", authMiddleware, deleteProject);


export default router;