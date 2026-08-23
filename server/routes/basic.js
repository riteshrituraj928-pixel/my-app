const express = require("express");

const {
    login,
    register
} = require("../controllers/authController");

const {
    createAthlete
} = require("../controllers/athelete.controller");

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


// =========================
// AUTH
// =========================

router.post("/register", register);

router.post("/login", login);


// =========================
// ATHLETE
// =========================

router.post("/athlete", createAthlete);


// =========================
// SCOUT
// =========================

router.post("/scout", createScout);

router.get("/scout/:id", getScoutById);

router.get("/scout/user/:userId", getScoutByUserId);

router.get("/scouts", listScouts);

router.put("/scout/:id", updateScout);

router.delete("/scout/:id", deleteScout);

router.patch(
    "/scout/:id/students-trained",
    incrementStudentsTrained
);


// =========================
// APPLICATIONS
// =========================

// Player applies to a scout
router.post("/apply", applyToScout);

// Player sees scouts they applied to
router.get(
    "/applications/player/:playerId",
    getMyApplications
);

// Player sees scouts they have NOT applied to
router.get(
    "/scouts/other/:playerId",
    getOtherScouts
);

// Scout sees applications received from players
router.get(
    "/applications/scout/:scoutId",
    getScoutApplications
);

// Scout accepts/rejects an application
router.patch(
    "/applications/:applicationId/status",
    updateApplicationStatus
);


module.exports = router;