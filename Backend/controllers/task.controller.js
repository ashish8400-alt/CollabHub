import Task from "../models/Task.js";
import Project from "../models/Project.js";


//createTask
const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, assignedTo, dueDate } = req.body;

        if (!title || !assignedTo) {
            return res.status(400).json({
                message: "Title and assigned member are required"
            });
        }

        // Check project and owner
        const project = await Project.findOne({
            _id: projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not the owner"
            });
        }

        // Check assigned user is a project member
        const isMember = project.members.some(
            (memberId) => memberId.toString() === assignedTo
        );

        if (!isMember) {
            return res.status(400).json({
                message: "User is not a project member"
            });
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            assignedTo,
            dueDate,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Task creation failed",
            error: error.message
        });
    }
};



//getProjectTasks
const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            members: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not a member"
            });
        }

        const tasks = await Task.find({
            project: projectId
        })
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");

        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
};



//getSingleTasks
const getSingleTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId)
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email")
            .populate("project", "name");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check user project ka member hai
        const project = await Project.findOne({
            _id: task.project._id,
            members: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "You are not a member of this project"
            });
        }

        res.status(200).json({
            message: "Task fetched successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message
        });
    }
};


//updateTask
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, assignedTo, dueDate } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check project owner
        const project = await Project.findOne({
            _id: task.project,
            owner: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "Only project owner can update task"
            });
        }

        if (title) {
            task.title = title;
        }

        if (description !== undefined) {
            task.description = description;
        }

        if (assignedTo) {
            const isMember = project.members.some(
                (memberId) => memberId.toString() === assignedTo
            );

            if (!isMember) {
                return res.status(400).json({
                    message: "User is not a project member"
                });
            }

            task.assignedTo = assignedTo;
        }

        if (dueDate !== undefined) {
            task.dueDate = dueDate;
        }

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Task update failed",
            error: error.message
        });
    }
};

//UpdateTaskStatus
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check assigned member
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Only assigned member can update task status"
            });
        }

        if (
            status !== "TODO" &&
            status !== "IN PROGRESS" &&
            status !== "DONE"
        ) {
            return res.status(400).json({
                message: "Invalid task status"
            });
        }

        task.status = status;

        await task.save();

        res.status(200).json({
            message: "Task status updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Task status update failed",
            error: error.message
        });
    }
};


//DeleteTask
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Check project owner
        const project = await Project.findOne({
            _id: task.project,
            owner: req.user.id
        });

        if (!project) {
            return res.status(403).json({
                message: "Only project owner can delete task"
            });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Task deletion failed",
            error: error.message
        });
    }
};

export {
    createTask , getProjectTasks, getSingleTask , updateTask ,updateTaskStatus ,deleteTask
};