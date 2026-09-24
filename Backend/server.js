import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";


import "dotenv/config";
import jwt from "jsonwebtoken";


// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import Message from "./models/Message.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import memberRoutes from "./routes/member.routes.js";
import taskRoutes from "./routes/task.routes.js";
import messageRoutes from "./routes/message.routes.js";



// dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


// io.on("connection", (socket) => { 
 
//     console.log("User connected:", socket.id); 
 
//     socket.on("message", (data) => { 
//         console.log("Message received:", data);

//         io.emit("message", data);
//     }); 
 
// });



// io.on("connection", (socket) => {

//     console.log("User connected:", socket.id);

//     socket.on("join", (userId) => {

//         socket.join(userId);

//         console.log("User joined room:", userId);

//     });

// });



io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error"));
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = decoded;

        next();

    } catch (error) {

        next(new Error("Invalid token"));

    }

});


io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {

        socket.join(userId);

        console.log("User joined room:", userId);

    });

   socket.on("message", async (data) => {

    console.log("Message received:", data);

    const newMessage = await Message.create({
        sender: data.senderId,
        receiver: data.receiverId,
        message: data.message
    });

    io.to(data.receiverId).emit("message", newMessage);

});

});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);



app.get("/", (req, res)=>{
   res.send("CollabHub API is running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
