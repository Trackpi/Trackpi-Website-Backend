require("dotenv").config();
const express = require("express")

const connectDB = require("./config/connection");
const cors = require('cors')
require('./config/connection')
adminRoute=require('./routes/adminRouter')
const app =express()

const fs = require("fs");
const path = require("path");

app.use(express.json())
app.use(cors())
app.use(adminRoute)



const projectRouter = require("./routes/projectRouter");

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();
console.log('MongoDB URI:', process.env.CONNECTION_STRING);

// Routes
app.use("/api/projects", projectRouter);

app.listen(3001,()=>{
    console.log("server is running");
})