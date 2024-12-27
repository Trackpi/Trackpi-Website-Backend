const Project = require('../models/projectSchema'); // Adjust if your project model is located elsewhere

exports.submitProject = async (req, res) => {
    
    try {
      console.log('Request body:', req.body);  // Log the body data
    console.log('Uploaded file:', req.file); 
      // Extract project details from the request body
      const {
        fullName, contactNumber, emailAddress, projectName, problemSolved,
        beneficiaries, successReason, skills, summary
      } = JSON.parse(req.body.data);
  
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
  // Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Retrieve all projects
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error retrieving projects:', error.message);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error retrieving project:', error.message);
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
};