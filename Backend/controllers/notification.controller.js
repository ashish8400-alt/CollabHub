import Notification from "../models/Notification.js";


// Create notification
const createNotification = async (req, res) => {

    try {

        const { recipient, sender, type, message } = req.body;

        if (!recipient || !type || !message) {
            return res.status(400).json({
                message: "Recipient, type and message are required"
            });
        }


        const notification = await Notification.create({
            recipient,
            sender: sender || null,
            type,
            message

        });


        res.status(201).json({
            message: "Notification created successfully",
            data: notification
        });

    } catch (error) {

        res.status(500).json({

            message: "Failed to create notification",

            error: error.message

        });
    }
};



// Get my notifications
const getMyNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({
            recipient: req.user.id
        })
        .sort({ createdAt: -1 });


        res.status(200).json({

            message: "Notifications fetched successfully",

            data: notifications

        });

    } catch (error) {

        res.status(500).json({

            message: "Failed to fetch notifications",

            error: error.message

        });

    }

};


// Mark notification as read
const markAsRead = async (req, res) => {

    try {

        const { notificationId } = req.params;


        const notification = await Notification.findOneAndUpdate(

            {
                _id: notificationId,
                recipient: req.user.id
            },

            {
                isRead: true
            },

            {
                new: true
            }

        );


        if (!notification) {

            return res.status(404).json({

                message: "Notification not found"

            });

        }


        res.status(200).json({

            message: "Notification marked as read",

            data: notification

        });

    } catch (error) {

        res.status(500).json({

            message: "Failed to mark notification as read",

            error: error.message

        });

    }

};


//Mark All as Rea
const markAllAsRead = async (req, res) => {
    try {

        await Notification.updateMany(
            {
                recipient: req.user.id,
                isRead: false
            },
            {
                isRead: true
            }
        );

        res.status(200).json({
            message: "All notifications marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to mark all notifications as read",
            error: error.message
        });

    }
};


//Count All UnRead Message
const getUnreadCount = async (req, res) => {
    try {

        const count = await Notification.countDocuments({
            recipient: req.user.id,
            isRead: false
        });

        res.status(200).json({
            count: count
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to get unread notification count",
            error: error.message
        });

    }
};


export { createNotification, getMyNotifications, markAsRead, markAllAsRead , getUnreadCount };