import Project from "../models/Project.js";


// createProject
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const project = await Project.create({
            name,
            description,
            owner: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Project creation failed",
            error: error.message
        });
    }
};


//getMyProject
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            members: req.user.id
        })
        .populate("owner", "name email")
        .populate("members", "name email");

        res.status(200).json({
            message: "Projects fetched successfully",
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};


// findsingleProject
const getSingleProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            members: req.user.id
        })
        .populate("owner", "name email")
        .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not a member"
            });
        }

        res.status(200).json({
            message: "Project fetched successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch project",
            error: error.message
        });
    }
};


//updateProject by only owner
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;

        const project = await Project.findOne({
            _id: projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not the owner"
            });
        }

        if (name) {
            project.name = name;
        }

        if (description !== undefined) {
            project.description = description;
        }

        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Project update failed",
            error: error.message
        });
    }
};



//DeleteProject
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOneAndDelete({
            _id: projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not the owner"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Project deletion failed",
            error: error.message
        });
    }
};



export {
    createProject, getMyProjects , getSingleProject, updateProject, deleteProject
};