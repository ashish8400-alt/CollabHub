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

        // Create notification
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


// =====================================
// GET COMMENTS
// =====================================

const getComments = async (req, res) => {
    try {

        const { taskId } = req.params;

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

        // Get comments
        const comments = await Comment.find({
            task: taskId
        })
            .populate(
                "user",
                "name email profileImage"
            )
            .sort({ createdAt: 1 });

        res.status(200).json({
            message: "Comments fetched successfully",
            data: comments
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch comments",
            error: error.message
        });
    }
};


const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find comment
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Find task
        const task = await Task.findById(comment.task);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Find project
        const project = await Project.findOne({
            _id: task.project,
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Check comment creator or project owner
        const isCommentOwner =
            comment.user.toString() === req.user.id;

        const isProjectOwner =
            project.owner.toString() === req.user.id;

        if (!isCommentOwner && !isProjectOwner) {
            return res.status(403).json({
                message: "You cannot delete this comment"
            });
        }

        // Delete comment
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete comment",
            error: error.message
        });
    }
};

export {
    createComment,
    getComments,
    deleteComment
};