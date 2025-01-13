const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Assuming you have multer in a separate file
const projectController = require('../controllers/projectController'); // Controller to handle the logic

// Route for submitting a project (with file upload)
router.post('/submit', upload.single('projectFile'), projectController.submitProject);

// Route to get all projects
router.get('/getAllProjects', projectController.getAllProjects);

// Route to get a project by ID
router.get('/getProjectById/:id', projectController.getProjectById);

module.exports = router;
