import bcrypt from "bcrypt";
import User from "../models/UserTemp.js";


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

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
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

    res.status(200).json({
        message: "Login successful",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
           
        }
    });


   }catch(error){
    res.status(500).json({
        message: "Login failed",
        error: error.message
    });
   }



}



export { registerUser, loginUser };