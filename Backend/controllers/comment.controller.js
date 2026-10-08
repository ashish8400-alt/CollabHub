// import Comment from "../models/Comment.js";
// import Task from "../models/Task.js";

// const createComment = async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         const { comment } = req.body;

//         if (!comment) {
//             return res.status(400).json({
//                 message: "Comment is required"
//             });
//         }

//         // Check task
//         const task = await Task.findById(taskId);

//         if (!task) {
//             return res.status(404).json({
//                 message: "Task not found"
//             });
//         }

//         // Create comment
//         const newComment = await Comment.create({
//             task: taskId,
//             user: req.user.id,
//             comment
//         });

//         res.status(201).json({
//             message: "Comment added successfully",
//             data: newComment
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to add comment",
//             error: error.message
//         });
//     }
// };

// export {
//     createComment
// };



import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import Project from "../models/Project.js";


const createComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({
                message: "Comment is required"
            });
        }

        // Check task
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check project owner or member
        const project = await Project.findOne({
            _id: task.project,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });

        if (!project) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        // Create comment
        const newComment = await Comment.create({
            task: taskId,
            user: req.user.id,
            comment
        });

        // Create notification for task creator
        const notification = await Notification.create({
            recipient: task.createdBy,
            sender: req.user.id,
            type: "COMMENT",
            message: `Someone commented on your task: ${task.title}`
        });

        // Send real-time notification
        const io = req.app.get("io");

        io.to(task.createdBy.toString()).emit(
            "notification",
            notification
        );

        res.status(201).json({
            message: "Comment added successfully",
            data: newComment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add comment",
            error: error.message
        });
    }
};


export {
    createComment
};