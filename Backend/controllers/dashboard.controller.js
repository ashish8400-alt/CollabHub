
import Project from "../models/Project.js";
import Task from "../models/Task.js";



const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // User ke projects find karna
        const projects = await Project.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        });

        // User ke projects ki IDs
        const projectIds = projects.map(project => project._id);

        // In projects ke saare tasks
        const tasks = await Task.find({
            project: { $in: projectIds }
        });

        // Task counts
        const totalTasks = tasks.length;

        const pendingTasks = tasks.filter(
            task => task.status === "TODO"
        ).length;

        const inProgressTasks = tasks.filter(
            task => task.status === "IN PROGRESS"
        ).length;

        const completedTasks = tasks.filter(
            task => task.status === "DONE"
        ).length;


        const upcomingDeadlines = tasks
    .filter(task =>
        task.dueDate &&
        task.dueDate >= new Date() &&
        task.status !== "DONE"
    )
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 5)
    .map(task => ({
        id: task._id,
        title: task.title,
        dueDate: task.dueDate,
        status: task.status
    }));


        return res.status(200).json({
            message: "Dashboard fetched successfully",
            totalProjects: projects.length,
            totalTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
            upcomingDeadlines
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch dashboard",
            error: error.message
        });
    }
};

export { getDashboard };

