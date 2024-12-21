const express = require('express');

const projectSchema = require('../models/projectSchema');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration to save files in the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDF files are allowed'));
  },
});

// Route to handle form submission
router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    const {
      fullName, contactNumber, emailAddress, projectName, problemSolved,
      beneficiaries, successReason, skills, summary
    } = req.body;

 // Get file path from Multer's 'req.file' object
 const filePath = req.file ? req.file.path : null;

    // Create a new project instance
    const project = new projectSchema({
      fullName, contactNumber, emailAddress, projectName, problemSolved,
      beneficiaries, successReason, skills, summary,file: filePath
=======
const multer = require('multer');
const path = require('path');
const projectSchema = require('../models/projectSchema');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');// Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to handle form submission with file upload
router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      emailAddress,
      projectName,
      problemSolved,
      beneficiaries,
      successReason,
      skills,
      summary,
    } = JSON.parse(req.body.data); // Parse JSON from 'data' field

    // Create a new project instance
    const project = new projectSchema({
      fullName,
      contactNumber,
      emailAddress,
      projectName,
      problemSolved,
      beneficiaries,
      successReason,
      skills,
      summary,
      file: req.file ? req.file.path : null, // Save file path

    });

    // Save the project to the database
    await project.save();

    res.status(201).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    console.error('Error saving project:', error.message);
    res.status(500).json({ error: 'Failed to submit project' });
  }
});

module.exports = router;

