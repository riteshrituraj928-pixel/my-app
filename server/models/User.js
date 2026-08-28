const mongoose = require("mongoose");

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
        password: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true,
            enum: ["scout", "player"]
        },
        sports: {
            type: [String],
            required: true
        },
        // Profile fields saved permanently in cloud
        age: { type: String, default: "" },
        gender: { type: String, default: "Male" },
        academicQualification: { type: String, default: "" },
        village: { type: String, default: "" },
        district: { type: String, default: "" },
        sport: { type: String, default: "" },
        sportLevel: { type: String, default: "Village Level" },
        villageRank: { type: String, default: "" },
        bio: { type: String, default: "" },
        achievements: { type: String, default: "" },
        videoProofUrl: { type: String, default: "" },
        photoProofUrl: { type: String, default: "" },
        scoutAgency: { type: String, default: "" },
        scoutExperience: { type: String, default: "" },
        targetRegions: { type: String, default: "" },
        isVerified: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
