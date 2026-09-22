import express from "express";

import { addMember , getProjectMembers, removeMember} from "../controllers/member.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:projectId/members", authMiddleware, addMember);
router.get("/:projectId/members", authMiddleware, getProjectMembers);
router.delete("/:projectId/members/:memberId", authMiddleware, removeMember);


export default router;