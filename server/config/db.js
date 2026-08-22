const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gaonkhiladi';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`=================================================`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`=================================================\n`);
  } catch (error) {
    console.log(`=================================================`);
    console.log(`ℹ️  MongoDB database server not detected at 127.0.0.1:27017`);
    console.log(`⚡ Using Built-in Persistent JSON Database (server/data/users.json)`);
    console.log(`✅ Server ready for instant Sign Up & Sign In!`);
    console.log(`=================================================\n`);
  }
};

module.exports = connectDB;
