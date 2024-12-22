const Project = require('../models/projectSchema'); // Adjust if your project model is located elsewhere

exports.submitProject = async (req, res) => {
    
    try {
      // Extract project details from the request body
      const {
        fullName, contactNumber, emailAddress, projectName, problemSolved,
        beneficiaries, successReason, skills, summary
      } = req.body;
  
      const filePath = req.file ? req.file.path : null;
  
      const project = new Project({
        fullName, contactNumber, emailAddress, projectName, problemSolved,
        beneficiaries, successReason, skills, summary, file: filePath
      });
  
      await project.save();
      res.status(201).json({ message: 'Project submitted successfully', project });
    } catch (error) {
      console.error('Error saving project:', error.message);
      res.status(500).json({ error: 'Failed to submit project' });
    }
  };