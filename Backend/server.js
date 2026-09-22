import "dotenv/config";

import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import memberRoutes from "./routes/member.routes.js";
import taskRoutes from "./routes/task.routes.js";



// dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/tasks", taskRoutes);



app.get("/", (req, res)=>{
   res.send("CollabHub API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
