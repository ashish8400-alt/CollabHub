
import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        otpExpiry: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const PendingRegistration = mongoose.model(
    "PendingRegistration",
    pendingRegistrationSchema
);

export default PendingRegistration;

