import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import "dotenv/config";
import jwt from "jsonwebtoken";

import cors from "cors";
import connectDB from "./config/db.js";

import Message from "./models/Message.js";
import Notification from "./models/Notification.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import memberRoutes from "./routes/member.routes.js";
import taskRoutes from "./routes/task.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";


connectDB();


const app = express();

const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


// ===============================
// SOCKET JWT AUTHENTICATION
// ===============================

io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {

        return next(
            new Error("Authentication error")
        );

    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = decoded;

        next();

    } catch (error) {

        next(
            new Error("Invalid token")
        );

    }

});


// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );


    // JWT se user ki ID
    const userId = socket.user.id;


    // User automatically apne room me join
    socket.join(userId);


    console.log(
        "User joined room:",
        userId
    );


    // ===============================
    // REAL-TIME MESSAGE
    // ===============================

    socket.on("message", async (data) => {

        try {

            console.log(
                "Message received:",
                data
            );


            // 1. Message MongoDB me save
            const newMessage = await Message.create({

                sender: socket.user.id,

                receiver: data.receiverId,

                message: data.message

            });


            // 2. Notification MongoDB me save
            const newNotification =
                await Notification.create({

                    recipient: data.receiverId,

                    sender: socket.user.id,

                    type: "MESSAGE",

                    message:
                        "You received a new message"

                });


            // 3. Receiver ko real-time message
            io.to(data.receiverId).emit(
                "message",
                newMessage
            );


            // 4. Receiver ko real-time notification
            io.to(data.receiverId).emit(
                "notification",
                newNotification
            );


        } catch (error) {

            console.log(
                "Message error:",
                error.message
            );

        }

    });

});


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// ROUTES
// ===============================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);

app.use(
    "/api/members",
    memberRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

app.use(
    "/api/messages",
    messageRoutes
);

app.use(
    "/api/notifications",
    notificationRoutes
);


// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {

    res.send(
        "CollabHub API is running"
    );

});


// ===============================
// SERVER
// ===============================

const PORT =
    process.env.PORT || 5000;


server.listen(PORT, () => {

    console.log(
        `Server is running on port ${PORT}`
    );

});