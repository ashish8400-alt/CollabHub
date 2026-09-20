import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        isVerified: {
        type: Boolean,
        default: false
        },
 
      

        registerOtp: {
    type: String,
    default: ""
},

registerOtpExpiry: {
    type: Date,
    default: null
},

        loginOtp: {
    type: String,
    default: ""
},

loginOtpExpiry: {
    type: Date,
    default: null
},


        password: {
            type: String,
            required: true
        },

        resetPasswordOtp: {
    type: String,
    default: ""
},

resetPasswordOtpExpiry: {
    type: Date,
    default: null
},

        profileImage: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }
    },
    {
        timestamps: true
    }
);


const User = mongoose.model("User", userSchema);

export default User;