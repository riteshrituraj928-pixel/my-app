const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("DB Connected Successfully");
        })
        .catch((error) => {
            console.log("DB Facing Connection Issues (start MongoDB on port 27017 to connect):", error.message);
        });
};

module.exports = connectWithDb;