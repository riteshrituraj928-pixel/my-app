const express = require("express");

const {
    login,
    register,
    updateProfile
} = require("../controllers/authController");

const { createAthlete } = require("../controllers/athelete.controller");

const {
    applyToScout,
    getMyApplications,
    getOtherScouts,
    getScoutApplications,
    updateApplicationStatus
} = require("../controllers/application.controller");

const {
    createScout,
    getScoutById,
    getScoutByUserId,
    listScouts,
    updateScout,
    deleteScout,
    incrementStudentsTrained
} = require("../controllers/scout.controller");

const router = express.Router();

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/update-profile", updateProfile);

// ATHLETE
router.post("/athlete", createAthlete);

// SCOUT
router.post("/scout", createScout);
router.get("/scout/:id", getScoutById);
router.get("/scout/user/:userId", getScoutByUserId);
router.get("/scouts", listScouts);
router.put("/scout/:id", updateScout);
router.delete("/scout/:id", deleteScout);
router.patch("/scout/:id/students-trained", incrementStudentsTrained);

// APPLICATIONS
router.post("/apply", applyToScout);
router.get("/applications/player/:playerId", getMyApplications);
router.get("/scouts/other/:playerId", getOtherScouts);
router.get("/applications/scout/:scoutId", getScoutApplications);
router.patch("/applications/:applicationId/status", updateApplicationStatus);

module.exports = router;
