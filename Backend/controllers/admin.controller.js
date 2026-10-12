
import User from "../models/UserTemp.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalProjects = await Project.countDocuments();

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({
            status: "DONE"
        });

        const recentUsers = await User.find()
            .select("name email role createdAt")
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            message: "Admin dashboard fetched successfully",
            totalUsers,
            totalProjects,
            totalTasks,
            completedTasks,
            recentUsers
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch admin dashboard",
            error: error.message
        });
    }
};

export { getAdminDashboard };

