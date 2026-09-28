import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

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

        // Create comment
        const newComment = await Comment.create({
            task: taskId,
            user: req.user.id,
            comment
        });

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