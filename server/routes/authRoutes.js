const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Path for built-in persistent JSON storage fallback
const dataDir = path.join(__dirname, '../data');
const usersFilePath = path.join(dataDir, 'users.json');

// Ensure data directory & users.json exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]), 'utf8');
}

// Helper functions for JSON storage fallback
const getJsonUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const saveJsonUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// @route   POST /api/auth/signup
// @desc    Register a new user (Player or Scout)
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, mobile, password, role, sports } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. IF MONGOOSE IS CONNECTED TO MONGODB
    if (mongoose.connection.readyState === 1) {
      const existingEmail = await User.findOne({ email: cleanEmail });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          isAlreadyRegistered: true,
          message: 'An account with this email already exists! Please Sign In.'
        });
      }

      const existingMobile = await User.findOne({ mobile: mobile.trim() });
      if (existingMobile) {
        return res.status(400).json({
          success: false,
          isAlreadyRegistered: true,
          message: 'An account with this mobile number already exists! Please Sign In.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email: cleanEmail,
        mobile,
        password: hashedPassword,
        role: role || 'player',
        sports: sports || []
      });

      const userResponse = newUser.toObject();
      delete userResponse.password;

      console.log(` Registered via MongoDB: ${userResponse.name} (${userResponse.role})`);
      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        user: userResponse
      });
    }

 
    const jsonUsers = getJsonUsers();

    if (jsonUsers.some((u) => u.email === cleanEmail)) {
      return res.status(400).json({
        success: false,
        isAlreadyRegistered: true,
        message: 'An account with this email already exists! Please Sign In.'
      });
    }
    if (jsonUsers.some((u) => u.mobile === mobile.trim())) {
      return res.status(400).json({
        success: false,
        isAlreadyRegistered: true,
        message: 'An account with this mobile number already exists! Please Sign In.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserObj = {
      _id: Date.now().toString(),
      name,
      email: cleanEmail,
      mobile,
      password: hashedPassword,
      role: role || 'player',
      sports: sports || [],
      verificationPercentage: 60,
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    jsonUsers.push(newUserObj);
    saveJsonUsers(jsonUsers);

    const userResponse = { ...newUserObj };
    delete userResponse.password;

    console.log(`✅ Registered & Saved to Database: ${userResponse.name} (${userResponse.role})`);
    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: userResponse
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during signup.', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & verify credentials
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { identifier, email, mobile, password } = req.body;
    const loginQuery = (identifier || email || mobile || '').trim();

    if (!loginQuery || !password) {
      return res.status(400).json({ success: false, message: 'Please provide Email/Mobile and Password.' });
    }

    // 1. IF MONGOOSE IS CONNECTED TO MONGODB
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({
        $or: [
          { email: loginQuery.toLowerCase() },
          { mobile: loginQuery }
        ]
      });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. User not found.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
      }

      const userResponse = user.toObject();
      delete userResponse.password;

      console.log(`✅ MongoDB Login Successful: ${userResponse.name} (${userResponse.role})`);
      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        user: userResponse
      });
    }

    // 2. FALLBACK TO BUILT-IN PERSISTENT JSON DATABASE
    const jsonUsers = getJsonUsers();
    const user = jsonUsers.find(
      (u) => u.email === loginQuery.toLowerCase() || u.mobile === loginQuery
    );

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    console.log(`✅ Login Verified from Database: ${userResponse.name} (${userResponse.role})`);
    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: userResponse
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
});

module.exports = router;
