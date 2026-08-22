const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['player', 'scout'],
      default: 'player'
    },
    sports: [
      {
        type: String
      }
    ],
    verificationPercentage: {
      type: Number,
      default: 60
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    // Optional profile fields populated during verification
    age: { type: String, default: '20' },
    gender: { type: String, default: 'Male' },
    academicQualification: { type: String, default: '12th Pass (Higher Secondary)' },
    village: { type: String, default: 'Khedi Sadh' },
    district: { type: String, default: 'Rohtak, Haryana' },
    sport: { type: String, default: 'Kabaddi' },
    sportLevel: { type: String, default: 'District Level Champion' },
    villageRank: { type: String, default: 'Rank #1 in Block' },
    rating: { type: Number, default: 4.9 },
    bio: { type: String, default: '' },
    achievements: { type: String, default: '' },
    videoProofUrl: { type: String, default: '' },
    photoProofUrl: { type: String, default: '' },
    scoutAgency: { type: String, default: '' },
    scoutExperience: { type: String, default: '' },
    targetRegions: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
