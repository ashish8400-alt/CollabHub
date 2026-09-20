import express from "express";
import { registerUser, loginUser ,  verifyLoginOtp , verifyRegisterOtp, forgotPassword , verifyResetOtp, resetPassword} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";





const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/verify/:token", verifyEmail);
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/verify-register-otp", verifyRegisterOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);


export default router;