const Scout = require("../models/scout.model");

exports.createScout = async (req, res) => {

    try {

        const {
            userId,
            institutePic,
            instituteName,
            location,
            earlierExperience,
            sportsPlayed,
            fee,
            studentsTrainedEarlier
        } = req.body;


        // Check required fields

        if (!userId || !instituteName || !institutePic || !fee) {

            return res.status(400).json({

                success: false,

                message:
                    "userId, instituteName, institutePic and fee are required"

            });

        }


        // Check whether Scout profile already exists

        const existingScout = await Scout.findOne({
            userId
        });


        if (existingScout) {

            return res.status(400).json({

                success: false,

                message: "Scout profile already exists"

            });

        }


        // Create Scout profile

        const scout = await Scout.create({

            userId,

            institutePic,

            instituteName,

            location,

            earlierExperience,

            sportsPlayed,

            fee,

            studentsTrainedEarlier

        });


        res.status(201).json({

            success: true,

            message: "Scout profile created successfully",

            data: scout

        });


    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   GET SCOUT BY ID
========================================================= */

exports.getScoutById = async (req, res) => {

    try {

        const scout = await Scout
            .findById(req.params.id)
            .populate(
                "userId",
                "name email mobileNo type sports"
            );


        if (!scout) {

            return res.status(404).json({

                success: false,

                message: "Scout not found"

            });

        }


        res.status(200).json({

            success: true,

            data: scout

        });


    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   GET SCOUT BY USER ID
========================================================= */

exports.getScoutByUserId = async (req, res) => {

    try {

        const scout = await Scout
            .findOne({
                userId: req.params.userId
            })
            .populate(
                "userId",
                "name email mobileNo type sports"
            );


        if (!scout) {

            return res.status(404).json({

                success: false,

                message: "Scout profile not found"

            });

        }


        res.status(200).json({

            success: true,

            data: scout

        });


    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   LIST SCOUTS
========================================================= */

exports.listScouts = async (req, res) => {

    try {

        const {
            sport,
            state,
            minExperience,
            maxFee,
            profileStatus,
            page = 1,
            limit = 20
        } = req.query;


        const filter = {};


        if (sport) {

            filter.sportsPlayed = sport;

        }


        if (state) {

            filter["location.state"] = state;

        }


        if (profileStatus) {

            filter.profileStatus = profileStatus;

        }


        if (minExperience) {

            filter[
                "earlierExperience.yearsOfExperience"
            ] = {
                $gte: Number(minExperience)
            };

        }


        if (maxFee) {

            filter["fee.amount"] = {
                $lte: Number(maxFee)
            };

        }


        const skip =
            (Number(page) - 1) * Number(limit);


        const scouts = await Scout
            .find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({
                createdAt: -1
            });


        const total =
            await Scout.countDocuments(filter);


        res.status(200).json({

            success: true,

            count: scouts.length,

            total,

            page: Number(page),

            totalPages:
                Math.ceil(
                    total / Number(limit)
                ),

            data: scouts

        });


    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   UPDATE SCOUT PROFILE
========================================================= */

exports.updateScout = async (req, res) => {

    try {

        const allowedFields = [

            "institutePic",

            "instituteName",

            "location",

            "earlierExperience",

            "sportsPlayed",

            "fee",

            "studentsTrainedEarlier",

            "profileStatus"

        ];


        const updates = {};


        allowedFields.forEach((field) => {

            if (req.body[field] !== undefined) {

                updates[field] =
                    req.body[field];

            }

        });


        const scout =
            await Scout.findByIdAndUpdate(

                req.params.id,

                updates,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!scout) {

            return res.status(404).json({

                success: false,

                message: "Scout not found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Scout profile updated successfully",

            data: scout

        });


    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   DELETE SCOUT PROFILE
========================================================= */

exports.deleteScout = async (req, res) => {

    try {

        const scout =
            await Scout.findByIdAndDelete(
                req.params.id
            );


        if (!scout) {

            return res.status(404).json({

                success: false,

                message: "Scout not found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Scout profile deleted successfully"

        });


    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};


/* =========================================================
   INCREMENT STUDENTS TRAINED
========================================================= */

exports.incrementStudentsTrained = async (req, res) => {

    try {

        const {
            count = 1
        } = req.body;


        const scout =
            await Scout.findByIdAndUpdate(

                req.params.id,

                {
                    $inc: {
                        studentsTrainedEarlier:
                            Number(count)
                    }
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!scout) {

            return res.status(404).json({

                success: false,

                message: "Scout not found"

            });

        }


        res.status(200).json({

            success: true,

            data: scout

        });


    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }
};