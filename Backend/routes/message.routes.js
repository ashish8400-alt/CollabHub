import express from "express";

import { sendMessage , getMessageHistory } from "../controllers/message.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post( "/send", authMiddleware , sendMessage);
router.get( "/history/:userId",  authMiddleware, getMessageHistory );

export default router;




// {
//     "message": "Login successful",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYjJkZWVmN2Q1Njc4ZjQ3OGMwYzI0NyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzkwMTA4MTY0LCJleHAiOjE3OTA3MTI5NjR9.Ji7faLy3XE0b2DG6cBO24pmBOBQr9Pj-Nw0nSU5XHGU",
//     "user": {
//         "id": "6ab2deef7d5678f478c0c247",
//         "name": "Ashish",
//         "email": "ashishtiwari1314q@gmail.com",
//         "role": "USER"
//     }
// }



// {
//     "message": "Login successful",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYjJkZmVjZjk4NzkzMDk0ODFhYTM3MyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzkwMTA4NjAzLCJleHAiOjE3OTA3MTM0MDN9.MH6nBe5YbvsYnP0MpgnfxFh3AKkXIbx0jmNTZ9YlFuQ",
//     "user": {
//         "id": "6ab2dfecf9879309481aa373",
//         "name": "Rahul",
//         "email": "powertalks2502@gmail.com",
//         "role": "USER"
//     }
// }