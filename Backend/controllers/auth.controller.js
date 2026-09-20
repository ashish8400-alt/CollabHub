import bcrypt from "bcrypt";
import User from "../models/UserTemp.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


// Register User
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // 1. Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 2. Check user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create registration OTP
        const registerOtp = crypto.randomInt(100000, 1000000).toString();

        // 5. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            registerOtp,
            registerOtpExpiry: new Date(Date.now() + 5 * 60 * 1000)
        });


        // console.log("Registration OTP:", registerOtp);
        // 6. Send OTP email
        await sendEmail(
            user.email,
            "Your CollabHub Registration OTP",
            `Your registration OTP is: ${registerOtp}. This OTP is valid for 5 minutes.`
        );

        // 7. Response
        res.status(201).json({
            message: "OTP sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// Login User
const loginUser  = async (req, res) => {
   try{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required"
        })
    };

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    };
     
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid password"
        })
    }


    // Email verification check
    if (!user.isVerified) {
    return res.status(403).json({
        message: "Please verify your email first"
    });
}

//OTP Verify
const loginOtp = crypto.randomInt(100000, 1000000).toString();
user.loginOtp = loginOtp;

user.loginOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);

await user.save();

await sendEmail(
    user.email,
    "Your CollabHub Login OTP",
    `Your login OTP is: ${loginOtp}. This OTP is valid for 5 minutes.`
);

// return res.status(200).json({
//     message: "OTP sent to your email"
// });

//     const token = jwt.sign(
//         {
//         id: user._id,
//            role: user.role
//     },
//     process.env.JWT_SECRET,
//      {
//         expiresIn: "7d"
//     }
    
// )

    // res.status(200).json({
    //     message: "Login successful",
    //     token,
    //     user:{
    //         id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         role: user.role

    //     }
    // });


   }catch(error){
    res.status(500).json({
        message: "Login failed",
        error: error.message
    });
   }



}


//verifyEmail 
// const verifyEmail = async (req, res) => {
//     try {
//         const { token } = req.params;

//         const user = await User.findOne({
//             verificationToken: token
//         });

//         if (!user) {
//             return res.status(400).json({
//                 message: "Invalid verification token"
//             });
//         }

//         user.isVerified = true;
//         user.verificationToken = "";

//         await user.save();

//         res.status(200).json({
//             message: "Email verified successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Email verification failed",
//             error: error.message
//         });
//     }
// };  isko isiliye comment kiya kyu ki aab verify token se nhi otp se kar rhe hai 



//verifyOtpbyLogin
const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Check email and OTP
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 3. Check OTP
        if (user.loginOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // 4. Check OTP expiry
        if (user.loginOtpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        // 5. Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // 6. Clear OTP
        user.loginOtp = "";
        user.loginOtpExpiry = null;

        await user.save();

        // 7. Final response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "OTP verification failed",
            error: error.message
        });
    }
};



//verifyOtobyRegister
const verifyRegisterOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Check email and OTP
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

//         console.log("OTP from Postman:", otp);
// console.log("OTP from DB:", user.registerOtp);

        // 3. Check OTP expiry
        if (user.registerOtpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        // 4. Check OTP
        if (user.registerOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // 5. Verify user
        user.isVerified = true;

        // 6. Clear OTP
        user.registerOtp = "";
        user.registerOtpExpiry = null;

        await user.save();

        // 7. Response
        res.status(200).json({
            message: "Registration successful. Email verified."
        });

    } catch (error) {
        res.status(500).json({
            message: "OTP verification failed",
            error: error.message
        });
    }
};


//forgotPassword 
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetPasswordOtp = crypto
            .randomInt(100000, 1000000)
            .toString();

        user.resetPasswordOtp = resetPasswordOtp;

        user.resetPasswordOtpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        await user.save();

        await sendEmail(
            user.email,
            "CollabHub Password Reset OTP",
            `Your password reset OTP is: ${resetPasswordOtp}. This OTP is valid for 5 minutes.`
        );

        res.status(200).json({
            message: "Password reset OTP sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            message: "Forgot password failed",
            error: error.message
        });
    }
};


//verifyForgotPassword
const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.resetPasswordOtpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (user.resetPasswordOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "OTP verification failed",
            error: error.message
        });
    }
};


//resetpassword
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "Email, OTP and new password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.resetPasswordOtpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (user.resetPasswordOtp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordOtp = "";
        user.resetPasswordOtpExpiry = null;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Password reset failed",
            error: error.message
        });
    }
};


export { registerUser, loginUser , verifyLoginOtp, verifyRegisterOtp, forgotPassword, verifyResetOtp, resetPassword};