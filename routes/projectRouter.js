const express = require('express');
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
