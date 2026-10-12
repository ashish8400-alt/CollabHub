
import cloudinary from "../config/cloudinary.js";
import User from "../models/UserTemp.js";
import streamifier from "streamifier";



const uploadProfileImage = async (req, res) => {
    try {
        // 1. Check image exists
        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image"
            });
        }

        // 2. Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "CollabHub/profile-images",
                    resource_type: "image"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        // 3. Save image URL in database
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                profileImage: result.secure_url
            },
            {
                new: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 4. Send response
        return res.status(200).json({
            message: "Profile image uploaded successfully",
            profileImage: user.profileImage
        });

    } catch (error) {
        return res.status(500).json({
            message: "Profile image upload failed",
            error: error.message
        });
    }
};




const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message
        });
    }
};



const updateMyProfile = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name: name.trim() },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
};




export { uploadProfileImage, getMyProfile , updateMyProfile };

