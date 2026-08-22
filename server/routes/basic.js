const express = require("express");

const {
    login,
    register
} = require("../controllers/authController");

const {
    createAthlete
} = require("../controllers/athelete.controller");

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


module.exports = router;