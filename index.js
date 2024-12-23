
require("dotenv").config();
const express = require("express")
const connectDB = require("./config/connection");
const cors = require('cors')
const fs = require("fs");
const path = require("path");
require('./config/connection')
adminRoute=require('./routes/adminRouter')
const projectRouter = require("./routes/projectRouter");
const videoRouter = require("./routes/videoRouter");
const interRouter = require('./routes/interRouter')

const app =express()
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb",extended: true }));
app.use(cors())
app.use(adminRoute)

// Ensure folders exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
};

ensureFolderExists(path.join(__dirname, "uploads/projects"));
ensureFolderExists(path.join(__dirname, "uploads/videos"));
ensureFolderExists(path.join(__dirname, "uploads/images"));

// Connect to database
connectDB();

app.use("/api/projects", projectRouter);
app.use("/api/videos", videoRouter);
app.use("/api/videos", interRouter);

app.listen(3001,()=>{
    console.log("server is running");
})