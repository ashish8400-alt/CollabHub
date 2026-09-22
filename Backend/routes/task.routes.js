import express from "express";

import {createTask , getProjectTasks , getSingleTask , updateTask , updateTaskStatus , deleteTask} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:projectId", authMiddleware,createTask);
router.get( "/:projectId",authMiddleware, getProjectTasks );
router.get( "/single/:taskId",authMiddleware,getSingleTask );
router.put( "/single/:taskId", authMiddleware, updateTask );
router.put( "/status/:taskId", authMiddleware, updateTaskStatus );
router.delete( "/single/:taskId", authMiddleware, deleteTask );

export default router;