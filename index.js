require("dotenv").config();
const express = require("express")
const cors = require('cors')
require('./config/connection')
const fs = require("fs");
const path = require("path");

adminRoute=require('./routes/adminRouter')
const app =express()
app.use(adminRoute)
const connectDB = require("./config/connection");

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Creates 'uploads' folder if it doesn't exist
}
const projectRouter = require("./routes/projectRouter");

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();
console.log('MongoDB URI:', process.env.CONNECTION_STRING);

// Routes
app.use("/api/projects", projectRouter);
const posterRoutes = require('./routes/posterRoutes');
app.use('/api/posters', posterRoutes);

app.listen(3001,()=>{
    console.log("server is running");
})