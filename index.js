
require("dotenv").config();
const express = require("express")
const connectDB = require("./config/connection");
const cors = require('cors')
const fs = require("fs");
const path = require("path");
require('./config/connection')
adminRoute=require('./routes/adminRouter')
const projectRouter = require("./routes/projectRouter");

const partnerRoutes = require('./routes/partnerRouter');
const posterRoutes = require('./routes/posterRoutes');

const videoRouter = require("./routes/videoRouter");
const interRouter = require('./routes/interRouter')


const app =express()
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb",extended: true }));
app.use(cors())
app.use(adminRoute)


app.use('/api/partners', partnerRoutes);
app.use('/api/posters', posterRoutes);

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}


// Ensure folders exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
};

ensureFolderExists(path.join(__dirname, "uploads/projects"));
ensureFolderExists(path.join(__dirname, "uploads/videos"));

ensureFolderExists(path.join(__dirname, "uploads/interns"))
ensureFolderExists(path.join(__dirname, "uploads/posters"));



// Connect to database
connectDB();

app.use("/api/projects", projectRouter);
app.use("/api/videos", videoRouter);
app.use("/api/interns", interRouter);

app.listen(3001,()=>{
    console.log("server is running");
})