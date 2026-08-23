const mongoose = require("mongoose");

const { Schema } = mongoose;

const scoutSchema = new Schema(
    {
        // Connect Scout profile to User account
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        institutePic: {
            type: String,
            required: true
        },

        instituteName: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            city: String,
            state: String,
            country: {
                type: String,
                default: "India"
            }
        },

        earlierExperience: {
            yearsOfExperience: {
                type: Number,
                min: 0
            },

            summary: {
                type: String
            }
        },

        sportsPlayed: [
            {
                type: String,
                enum: [
                    "Chess",
                    "Cricket",
                    "Football",
                    "Wrestling",
                    "Hockey",
                    "Kabaddi",
                    "Volleyball",
                    "Badminton",
                    "Athletics",
                    "Archery"
                ]
            }
        ],

        fee: {
            amount: {
                type: Number,
                required: true,
                min: 0
            },

            currency: {
                type: String,
                default: "INR"
            },

            unit: {
                type: String,

                enum: [
                    "per session",
                    "per month",
                    "per athlete",
                    "one-time"
                ],

                default: "per session"
            }
        },

        studentsTrainedEarlier: {
            type: Number,
            default: 0,
            min: 0
        },

        profileStatus: {
            type: String,

            enum: [
                "Draft",
                "Submitted",
                "Verified",
                "Rejected"
            ],

            default: "Draft"
        }
    },

    {
        timestamps: true
    }
);
const Scout = mongoose.model("Scout", scoutSchema);
module.exports = Scout;