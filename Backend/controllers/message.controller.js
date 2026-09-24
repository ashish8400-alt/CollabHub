import Message from "../models/Message.js";
import User from "../models/UserTemp.js";



const sendMessage = async (req, res) => {
    try {
        const { receiver, message } = req.body;

        // Message check
        if (!receiver || !message) {
            return res.status(400).json({
                message: "Receiver and message are required"
            });
        }

        // Receiver check
        const user = await User.findById(receiver);

        if (!user) {
            return res.status(404).json({
                message: "Receiver not found"
            });
        }

        // Message create
        const newMessage = await Message.create({
            sender: req.user.id,
            receiver,
            message
        });

        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to send message",
            error: error.message
        });
    }
};


const getMessageHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                {
                    sender: req.user.id,
                    receiver: userId
                },
                {
                    sender: userId,
                    receiver: req.user.id
                }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            message: "Message history fetched successfully",
            data: messages
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch message history",
            error: error.message
        });
    }
};

export {
    sendMessage , getMessageHistory
};