import Project from "../models/Project.js";
import User from "../models/UserTemp.js";
import Notification from "../models/Notification.js";



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

        // Create notification
        const notification = await Notification.create({
            recipient: user._id,
            sender: req.user.id,
            type: "PROJECT_INVITE",
            message: `You have been added to the project: ${project.name}`
        });

        // Send real-time notification
        const io = req.app.get("io");

        io.to(user._id.toString()).emit(
            "notification",
            notification
        );

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
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        }).populate(
            "members",
            "name email profileImage role"
        );

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

        // Check project owner
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

        // Check member actually exists in project
        const isMember = project.members.some(
            (id) => id.toString() === memberId
        );

        if (!isMember) {
            return res.status(404).json({
                message: "User is not a member of this project"
            });
        }

        // Remove member
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