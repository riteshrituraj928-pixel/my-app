const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

const connectWithDb = require("./config/database");
connectWithDb();

const basic = require("./routes/basic");
//mount
app.use("/api/v1", basic);

app.get("/", (req, res) => {
    res.send(`<h1>This is my homePage baby</h1>`);
});

// Global error handler (Express 5 forwards async errors here automatically)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

//start the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
});