import nodemailer from "nodemailer";


const transporter  = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
  }
});


const sendEmail = async (to, subject, text) => {

  
  await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
};


// ye banaye the test keliye 
// sendEmail(
//     "ashishtiwari1314q@gmail.com",
//     "CollabHub Test Email",
//     "Ye CollabHub se test email hai."
// )
// .then(() => {
//     console.log("Email sent successfully");
// })
// .catch((error) => {
//     console.log("Email sending failed:", error.message);
// });

export default sendEmail;