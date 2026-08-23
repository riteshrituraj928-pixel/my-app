const Application = require("../models/Application.model");
const { Athlete } = require("../models/Athelete.model");
const Scout = require("../models/scout.model");

exports.applyToScout = async (req, res) => {

    try {

        const { playerId, scoutId } = req.body;

        console.log("PLAYER ID:", playerId);
        console.log("SCOUT ID:", scoutId);
        console.log("ATHLETE MODEL:", typeof Athlete.findById);
        console.log("SCOUT MODEL:", typeof Scout.findById);

        if (!playerId || !scoutId) {
            return res.status(400).json({
                success: false,
                message: "playerId and scoutId are required"
            });
        }

        const athleteExists = await Athlete.findById(playerId);

        if (!athleteExists) {
            return res.status(404).json({
                success: false,
                message: "Athlete not found"
            });
        }

        const scoutExists = await Scout.findById(scoutId);

        if (!scoutExists) {
            return res.status(404).json({
                success: false,
                message: "Scout not found"
            });
        }

        const application = await Application.create({
            playerId,
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

        const applications = await Application.find({
            playerId
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


// ==========================================
// OTHER SCOUTS
// Scouts this player has NOT applied to
//
// GET /api/v1/scouts/other/:playerId
// ==========================================

exports.getOtherScouts = async (req, res) => {

    try {

        const { playerId } = req.params;

        const existingApplications = await Application.find({
            playerId
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