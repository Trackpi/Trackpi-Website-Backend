const express = require('express');
const projectController = require('../controllers/projectController'); // Import the controller
const upload = require('../middlewares/multer'); // Import the multer middleware

const router = express.Router();

// Route to handle project form submission
router.post('/submit', upload.single('file'), projectController.submitProject);

module.exports = router;
