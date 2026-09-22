import Project from "../models/Project.js";
import User from "../models/UserTemp.js";



// Add member to project
const addMember = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Member email is required"
            });
        }

        // Only project owner can add members
        const project = await Project.findOne({
            _id: projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not the owner"
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if user is already a member
        const alreadyMember = project.members.some(
            (memberId) => memberId.toString() === user._id.toString()
        );

        if (alreadyMember) {
            return res.status(400).json({
                message: "User is already a member"
            });
        }

        // Add user to project
        project.members.push(user._id);

        await project.save();

        res.status(200).json({
            message: "Member added successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add member",
            error: error.message
        });
    }
};


//findprojectMember
const getProjectMembers = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            members: req.user.id
        }).populate("members", "name email profileImage role");

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not a member"
            });
        }

        res.status(200).json({
            message: "Project members fetched successfully",
            members: project.members
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch project members",
            error: error.message
        });
    }
};


//removeMemberByOwner
const removeMember = async (req, res) => {
    try {
        const { projectId, memberId } = req.params;

        // Project find karo
        const project = await Project.findOne({
            _id: projectId,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found or you are not the owner"
            });
        }

        // Owner khud ko remove nahi kar sakta
        if (memberId === req.user.id) {
            return res.status(400).json({
                message: "Owner cannot be removed"
            });
        }

        // Member ko project se remove karo
        project.members = project.members.filter(
            (id) => id.toString() !== memberId
        );

        await project.save();

        res.status(200).json({
            message: "Member removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to remove member",
            error: error.message
        });
    }
};

export {
    addMember, getProjectMembers, removeMember
};