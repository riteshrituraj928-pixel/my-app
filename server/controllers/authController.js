const User = require("../models/User");

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            mobileNo,
            type,
            sports
        } = req.body;


        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !mobileNo ||
            !type ||
            !sports
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check if user already exists
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Create user
        const user = await User.create({
            name,
            email,
            password,
            mobileNo,
            type,
            sports
        });


        res.status(201).json({

            message: "Registration successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                type: user.type,
                sports: user.sports
            }

        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {

    try {

        const {
            email,
            password,
            type
        } = req.body;


        // Check required fields
        if (!email || !password || !type) {

            return res.status(400).json({
                message: "Email, password and type are required"
            });

        }


        // Find user
        const user = await User.findOne({
            email,
            type
        });


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        // Check password
        if (user.password !== password) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }


        res.status(200).json({

            message: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                type: user.type,
                sports: user.sports
            }

        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    register,
    login
};