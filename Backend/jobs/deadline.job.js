// import cron from "node-cron";
// import Task from "../models/Task.js";

// const startDeadlineJob = () => {

//     cron.schedule("* * * * *", async () => {

//         try {

//             console.log("Checking task deadlines...");

//             const now = new Date();

//             const next24Hours = new Date(
//                 now.getTime() + 24 * 60 * 60 * 1000
//             );

//             const tasks = await Task.find({
//                 dueDate: {
//                     $gte: now,
//                     $lte: next24Hours
//                 },
//                 status: {
//                     $ne: "DONE"
//                 }
//             });

//             console.log(
//                 "Tasks due within 24 hours:",
//                 tasks.length
//             );

//         } catch (error) {

//             console.log(
//                 "Deadline job error:",
//                 error.message
//             );

//         }

//     });

// };

// export default startDeadlineJob;


import cron from "node-cron";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";

const startDeadlineJob = (io) => {

    cron.schedule("* * * * *", async () => {

        try {

            console.log("Checking task deadlines...");

            const now = new Date();

            const next24Hours = new Date(
                now.getTime() + 24 * 60 * 60 * 1000
            );

            const tasks = await Task.find({
                dueDate: {
                    $gte: now,
                    $lte: next24Hours
                },
                status: {
                    $ne: "DONE"
                }
            });

            for (const task of tasks) {


                // Check if deadline notification already exists
                const alreadyNotified = await Notification.findOne({
                    task: task._id,
                    type: "DEADLINE"
                });

                // If already notified, skip
                if (alreadyNotified) {
                    continue;
                }

     // Create deadline notification
                const notification = await Notification.create({
                    recipient: task.assignedTo,
                    sender: task.createdBy,
                    type: "DEADLINE",
                    message: `Your task "${task.title}" is due within 24 hours`
                });


                // Send real-time notification
                io.to(task.assignedTo.toString()).emit(
                    "notification",
                    notification
                );
            }

            console.log(
                "Deadline notifications checked:",
                tasks.length
            );

        } catch (error) {

            console.log(
                "Deadline job error:",
                error.message
            );

        }

    });

};

export default startDeadlineJob;