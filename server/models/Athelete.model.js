const mongoose = require("mongoose");

const { Schema } = mongoose;
const proofSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["video", "certificate"],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        fileUrl: {
            type: String,
            required: true
        },

        issuedBy: {
            type: String,
            trim: true
        },

        issuedDate: {
            type: Date
        },

        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: false,
        timestamps: true
    }
);




const trainingInstituteSchema = new Schema(
    {
        instituteName: {
            type: String,
            required: true,
            trim: true
        },

        sport: {
            type: String,
            required: true
        },

        coachName: {
            type: String,
            trim: true
        },

        from: {
            type: Date
        },

        to: {
            type: Date
        },

        certificateUrl: {
            type: String
        }
    },
    {
        _id: false
    }
);

// Cricket
const cricketDataSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"]
        },

        battingStyle: {
            type: String,
            enum: ["Right-Handed", "Left-Handed"]
        },

        bowlingStyle: {
            type: String
        },

        formatsPlayed: [
            {
                type: String,
                enum: ["Test", "ODI", "T20", "T10"]
            }
        ],

        runningBetweenWickets: {
            type: Number,
            min: 1,
            max: 10
        },

        strikeRate: {
            type: Number,
            min: 0
        },

        economyRate: {
            type: Number,
            min: 0
        },

        fieldingPosition: {
            type: String
        }
    },
    {
        _id: false
    }
);


// Football
const footballDataSchema = new Schema(
    {
        position: {
            type: String,
            enum: [
                "Goalkeeper",
                "Defender",
                "Midfielder",
                "Forward"
            ]
        },

        dominantFoot: {
            type: String,
            enum: ["Left", "Right", "Both"]
        },

        sprint40mTime: {
            type: Number,
            min: 0
        },

        staminaRating: {
            type: Number,
            min: 1,
            max: 10
        }
    },
    {
        _id: false
    }
);


// Hockey
const hockeyDataSchema = new Schema(
    {
        position: {
            type: String,
            enum: [
                "Goalkeeper",
                "Defender",
                "Midfielder",
                "Forward"
            ]
        },

        dominantHand: {
            type: String,
            enum: ["Left", "Right"]
        },

        penaltyCornerSpecialist: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: false
    }
);


// Volleyball
const volleyballDataSchema = new Schema(
    {
        position: {
            type: String,
            enum: [
                "Setter",
                "Libero",
                "Outside Hitter",
                "Middle Blocker",
                "Opposite"
            ]
        },

        verticalJump: {
            type: Number,
            min: 0
        },

        attackHand: {
            type: String,
            enum: ["Left", "Right"]
        }
    },
    {
        _id: false
    }
);


// Athletics
const athleticsDataSchema = new Schema(
    {
        event: {
            type: String,
            enum: [
                "100m", "200m", "400m", "800m", "1500m", "Long Jump", "High Jump",
                "Shot Put", "Javelin", "Marathon", "Relay"
            ]
        },

        personalBest: {
            type: String
        },

        category: {
            type: String,
            enum: ["Track", "Field"]
        }
    },
    {
        _id: false
    }
);


// Wrestling
const wrestlingDataSchema = new Schema(
    {
        weightCategory: {
            type: String
        },

        style: {
            type: String,
            enum: ["Freestyle", "Greco-Roman"]
        }
    },
    {
        _id: false
    }
);


// Kabaddi
const kabaddiDataSchema = new Schema(
    {
        role: {
            type: String,
            enum: ["Raider", "Defender", "All-Rounder"]
        },

        raidSuccessRate: {
            type: Number,
            min: 0,
            max: 100
        },

        tacklePoints: {
            type: Number,
            min: 0
        }
    },
    {
        _id: false
    }
);


// Badminton
const badmintonDataSchema = new Schema(
    {
        playStyle: {
            type: String,
            enum: ["Singles", "Doubles", "Mixed Doubles"]
        },

        dominantHand: {
            type: String,
            enum: ["Left", "Right"]
        },

        currentRanking: {
            type: Number,
            min: 1
        }
    },
    {
        _id: false
    }
);


// Archery
const archeryDataSchema = new Schema(
    {
        bowType: {
            type: String,
            enum: ["Recurve", "Compound", "Barebow"]
        },

        drawWeight: {
            type: Number,
            min: 0
        },

        averageScore: {
            type: Number,
            min: 0
        }
    },
    {
        _id: false
    }
);


// Chess
const chessDataSchema = new Schema(
    {
        fideRating: {
            type: Number,
            min: 0
        },

        title: {
            type: String,
            enum: [
                "None", "CM", "FM", "IM", "GM", "WCM", "WFM", "WIM", "WGM"
            ],
            default: "None"
        },

        preferredOpening: {
            type: String
        }
    },
    {
        _id: false
    }
);


const SPORT_SCHEMA_MAP = {
    Cricket: cricketDataSchema,
    Football: footballDataSchema,
    Hockey: hockeyDataSchema,
    Volleyball: volleyballDataSchema,
    Athletics: athleticsDataSchema,
    Wrestling: wrestlingDataSchema,
    Kabaddi: kabaddiDataSchema,
    Badminton: badmintonDataSchema,
    Archery: archeryDataSchema,
    Chess: chessDataSchema
};

const sportProfileSchema = new Schema(
    {
        sportName: {
            type: String,
            required: true,
            enum: Object.keys(SPORT_SCHEMA_MAP)
        },

        experienceYears: {
            type: Number,
            min: 0
        },

        currentLevel: {
            type: String,
            enum: [
                "School",
                "District",
                "State",
                "National",
                "International"
            ]
        },

        data: {
            type: Schema.Types.Mixed,
            required: true
        },

        proofs: {
            type: [proofSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const athleteSchema = new Schema(
    {
        /*
         * Connects this profile to the User account.
         *
         * User.js:
         * _id
         * name
         * email
         * password
         * type
         * sports
         *
         * Athlete.js:
         * userId -> User._id
         */
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        photoUrl: {
            type: String
        },

        dob: {
            type: Date,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },

        location: {
            city: {
                type: String
            },

            state: {
                type: String
            },

            country: {
                type: String,
                default: "India"
            }
        },

        experience: {
            type: Number,
            min: 0
        },

        academicQualification: {
            highestDegree: {
                type: String
            },

            institution: {
                type: String
            },

            yearOfCompletion: {
                type: Number
            }
        },

        trainingInstitutes: {
            type: [trainingInstituteSchema],
            default: []
        },

        generalProofs: {
            type: [proofSchema],
            default: []
        },

        sports: {
            type: [sportProfileSchema],
            default: []
        },

        about: {
            type: String,
            maxlength: 1000
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

athleteSchema.virtual("age").get(function () {

    if (!this.dob) {
        return null;
    }

    const today = new Date();

    let age = today.getFullYear() - this.dob.getFullYear();

    const monthDifference =
        today.getMonth() - this.dob.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < this.dob.getDate()
        )
    ) {
        age--;
    }

    return age;
});

athleteSchema.set("toJSON", {
    virtuals: true
});

athleteSchema.set("toObject", {
    virtuals: true
});

const Athlete =
    mongoose.models.Athlete ||
    mongoose.model("Athlete", athleteSchema);

    
module.exports = {
    Athlete,
    SPORT_SCHEMA_MAP
};