const Project = require('../models/projectSchema'); // Adjust if your project model is located elsewhere


exports.submitProject = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the body data
    console.log("Uploaded file:", req.file); // Log the file

    if (!req.file) {
      return res.status(400).json({ error: "File upload is required" });
    }

    // Get the original filename from req.file
    const { originalname } = req.file;

    // Destructure the project data directly from req.body
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
    } = req.body;

    // Check if required fields are missing
    if (!fullName || !contactNumber || !emailAddress || !projectName || !problemSolved) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle file path
    const filePath = `http://localhost:${process.env.PORT}/uploads/projects/${req.file.filename}`;

    // Create a new project document
    const project = new Project({
      fullName,
      contactNumber,
      emailAddress,
      projectName,
      problemSolved,
      beneficiaries,
      successReason,
      skills,
      summary,
      file: filePath,  // Full file path
      fileName: originalname, // Original filename
    });

    // Save the project to the database
    await project.save();

    // Return success response
    res.status(201).json({
      message: "Project submitted successfully",
      project,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the full error
    res.status(500).json({
      error: "Failed to submit project",
      details: error.message,
    });
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
