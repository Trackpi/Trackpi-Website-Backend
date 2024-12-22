
require("dotenv").config();
const express = require("express")

const connectDB = require("./config/connection");
const cors = require('cors')
require('./config/connection')
adminRoute=require('./routes/adminRouter')
const projectRouter = require("./routes/projectRouter");

const app =express()

const fs = require("fs");
const path = require("path");

app.use(express.json())
app.use(cors())
app.use(adminRoute)

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}

// Connect to database
connectDB();

app.use("/api/projects", projectRouter);

app.listen(3001,()=>{
    console.log("server is running");
})