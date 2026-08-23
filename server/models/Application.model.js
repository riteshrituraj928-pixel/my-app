const mongoose = require("mongoose");

const { Schema } = mongoose;

const applicationSchema = new Schema(
    {
        playerId: {
            type: Schema.Types.ObjectId,
            ref: "Athlete",
            required: true
        },

        scoutId: {
            type: Schema.Types.ObjectId,
            ref: "Scout",
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

// Prevent the same player from applying to
// the same scout more than once.
applicationSchema.index(
    { playerId: 1, scoutId: 1 },
    { unique: true }
);

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;