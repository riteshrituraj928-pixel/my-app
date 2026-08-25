const mongoose = require("mongoose");
const Scout = require("./models/scout.model");
const User = require("./models/User");
require("dotenv").config();

const scoutsData = [
  {
    userName: "Coach Mahavir Singh",
    email: "mahavir.singh@scout.gaonkhiladi.in",
    mobileNo: "9812000001",
    instituteName: "Haryana Kushti & Akhada Foundation",
    institutePic: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    location: { city: "Rohtak", state: "Haryana", country: "India" },
    sportsPlayed: ["Wrestling", "Kabaddi"],
    earlierExperience: {
      yearsOfExperience: 14,
      summary: "Trained 6 national medalists and 2 international wrestlers. Specializes in Dangal, Greco-Roman & Freestyle wrestling."
    },
    fee: { amount: 1500, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 340,
    profileStatus: "Verified"
  },
  {
    userName: "Sunil Deshmukh",
    email: "sunil.deshmukh@scout.gaonkhiladi.in",
    mobileNo: "9812000002",
    instituteName: "National Cricket Excellence Academy",
    institutePic: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    location: { city: "Ranchi", state: "Jharkhand", country: "India" },
    sportsPlayed: ["Cricket"],
    earlierExperience: {
      yearsOfExperience: 18,
      summary: "BCCI Level 3 certified coach. Focus on fast bowling, wicket-keeping & middle-order batting techniques for rural talent."
    },
    fee: { amount: 2500, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 520,
    profileStatus: "Verified"
  },
  {
    userName: "Sanjoy Sen",
    email: "sanjoy.sen@scout.gaonkhiladi.in",
    mobileNo: "9812000003",
    instituteName: "Golden Boot Grassroots Football Club",
    institutePic: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    location: { city: "Kolkata", state: "West Bengal", country: "India" },
    sportsPlayed: ["Football"],
    earlierExperience: {
      yearsOfExperience: 11,
      summary: "I-League certified scouting scout. Actively recruiting strikers and wingers for district & state league trials."
    },
    fee: { amount: 1200, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 280,
    profileStatus: "Verified"
  },
  {
    userName: "Balwanth Choudhary",
    email: "balwanth.pkl@scout.gaonkhiladi.in",
    mobileNo: "9812000004",
    instituteName: "Pro Kabaddi Talent Hunt Center",
    institutePic: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    location: { city: "Jaipur", state: "Rajasthan", country: "India" },
    sportsPlayed: ["Kabaddi"],
    earlierExperience: {
      yearsOfExperience: 15,
      summary: "Former PKL assistant coach. Scouting agile raiders and ankle-hold corner defenders from rural tournaments."
    },
    fee: { amount: 1000, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 410,
    profileStatus: "Verified"
  },
  {
    userName: "Anju Thomas",
    email: "anju.athletics@scout.gaonkhiladi.in",
    mobileNo: "9812000005",
    instituteName: "SprintSprint Track & Field Institute",
    institutePic: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    location: { city: "Kottayam", state: "Kerala", country: "India" },
    sportsPlayed: ["Athletics"],
    earlierExperience: {
      yearsOfExperience: 12,
      summary: "Specialized speed and endurance training for 100m, 400m, Long Jump, and High Jump village prodigies."
    },
    fee: { amount: 1800, currency: "INR", unit: "per month" },
    studentsTrainedEarlier: 190,
    profileStatus: "Verified"
  }
];

async function seed() {
  const dbUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/gaonkhiladi";
  try {
    console.log("Connecting to MongoDB:", dbUrl);
    await mongoose.connect(dbUrl);
    //console.log("Connected to MongoDB successfully");

    for (const item of scoutsData) {
      let user = await User.findOne({ email: item.email });
      if (!user) {
        user = await User.create({
          name: item.userName,
          email: item.email,
          password: "Password@123",
          mobileNo: item.mobileNo,
          type: "scout",
          sports: item.sportsPlayed
        });
        console.log(`Created scout user: ${user.name}`);
      }

      let scout = await Scout.findOne({ userId: user._id });
      if (!scout) {
        scout = await Scout.create({
          userId: user._id,
          institutePic: item.institutePic,
          instituteName: item.instituteName,
          location: item.location,
          earlierExperience: item.earlierExperience,
          sportsPlayed: item.sportsPlayed,
          fee: item.fee,
          studentsTrainedEarlier: item.studentsTrainedEarlier,
          profileStatus: item.profileStatus
        });
        console.log(`Created scout profile: ${scout.instituteName}`);
      }
    }

    console.log("Scout seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
}

seed();
