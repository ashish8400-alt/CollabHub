import express from "express";

import { createNotification, getMyNotifications, markAsRead , markAllAsRead, getUnreadCount} from "../controllers/notification.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// Create notification
router.post( "/create", authMiddleware, createNotification );


// Get my notifications
router.get( "/my", authMiddleware, getMyNotifications );

// Mark notification as read
router.put( "/read/:notificationId", authMiddleware, markAsRead );

//Mark All As Read
router.put( "/read-all", authMiddleware, markAllAsRead  );

//Count Unread Message
router.get( "/unread-count", authMiddleware, getUnreadCount );
export default router;