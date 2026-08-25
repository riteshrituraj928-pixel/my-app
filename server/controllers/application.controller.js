const Application = require("../models/Application.model");
const { Athlete } = require("../models/Athelete.model");
const Scout = require("../models/scout.model");
const User = require("../models/User");

// Helper to resolve or auto-create Athlete record from either Athlete._id or User._id
async function resolveAthlete(playerId) {
    if (!playerId) return null;
    let athlete = null;
    try {
        athlete = await Athlete.findById(playerId);
    } catch (e) {}

    if (!athlete) {
        try {
            athlete = await Athlete.findOne({ userId: playerId });
        } catch (e) {}
    }

    if (!athlete) {
        try {
            const user = await User.findById(playerId);
            if (user) {
                athlete = await Athlete.create({
                    userId: user._id,
                    dob: new Date("2002-01-01"),
                    gender: "Male",
                    location: { city: "Village", state: "India", country: "India" },
                    sports: user.sports ? user.sports.map(s => ({ sportName: s, experienceYears: 2, currentLevel: "District", data: {} })) : []
                });
            }
        } catch (e) {}
    }

    return athlete;
}

exports.applyToScout = async (req, res) => {
    try {
        const { playerId, scoutId } = req.body;

        if (!playerId || !scoutId) {
            return res.status(400).json({
                success: false,
                message: "playerId and scoutId are required"
            });
        }

        const athlete = await resolveAthlete(playerId);
        if (!athlete) {
            return res.status(404).json({
                success: false,
                message: "Athlete / Player profile not found"
            });
        }

        const scoutExists = await Scout.findById(scoutId);
        if (!scoutExists) {
            return res.status(404).json({
                success: false,
                message: "Scout not found"
            });
        }

        const effectivePlayerId = athlete._id;

        const existingApp = await Application.findOne({
            playerId: effectivePlayerId,
            scoutId
        });

        if (existingApp) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this scout"
            });
        }

        const application = await Application.create({
            playerId: effectivePlayerId,
            scoutId
        });

        res.status(201).json({
            success: true,
            message: "Application sent successfully",
            data: application
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this scout"
            });
        }

        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const { playerId } = req.params;
        const athlete = await resolveAthlete(playerId);
        const searchIds = [playerId];
        if (athlete && athlete._id.toString() !== playerId) {
            searchIds.push(athlete._id);
        }

        const applications = await Application.find({
            playerId: { $in: searchIds }
        })
        .populate("scoutId")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getOtherScouts = async (req, res) => {
    try {
        const { playerId } = req.params;
        const athlete = await resolveAthlete(playerId);
        const searchIds = [playerId];
        if (athlete && athlete._id.toString() !== playerId) {
            searchIds.push(athlete._id);
        }

        const existingApplications = await Application.find({
            playerId: { $in: searchIds }
        }).select("scoutId");

        const appliedScoutIds = existingApplications.map(
            application => application.scoutId
        );

        const otherScouts = await Scout.find({
            _id: {
                $nin: appliedScoutIds
            }
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: otherScouts.length,
            data: otherScouts
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ==========================================
// SCOUT'S APPLICATIONS
// Players who applied to this scout
//
// GET /api/v1/applications/scout/:scoutId
// ==========================================

exports.getScoutApplications = async (req, res) => {

    try {

        const { scoutId } = req.params;

        const applications = await Application.find({
            scoutId
        })
        .populate({
            path: "playerId",
            populate: {
                path: "userId",
                select: "name email mobileNo"
            }
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// ==========================================
// ACCEPT / REJECT APPLICATION
//
// PATCH /api/v1/applications/:applicationId/status
// ==========================================

exports.updateApplicationStatus = async (req, res) => {

    try {

        const { applicationId } = req.params;
        const { status } = req.body;

        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "status must be Accepted or Rejected"
            });
        }

        const application =
            await Application.findByIdAndUpdate(
                applicationId,
                {
                    status
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate("playerId")
            .populate("scoutId");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Application ${status.toLowerCase()}`,
            data: application
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};