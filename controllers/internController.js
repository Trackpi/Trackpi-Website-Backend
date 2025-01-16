const Intern = require("../models/internSchema");
// Function to generate a unique employeeID if not provided
const generateEmployeeID = () => {
  // Generate employeeID (for example, by combining current date and random number)
  return 'EMP-' + new Date().getTime() + Math.floor(Math.random() * 1000);
};

// Add a new intern
exports.addIntern = async (req, res) => {
  // console.log("sdfghj");
  
  try {
    const { body, files } = req;

    // File paths
    const profileImage = files?.profileImage?.[0]?.path || null;
    const certificate = files?.Certificate?.[0]?.path || null;

    // Validate required fields
    const requiredFields = [
      "name",
      "empID",
      "email",
      "phone",
      "fullAddress",
      "gender",
      "dob",
      "bloodGroup",
      "dateOfJoining",
      "jobRole",
      "employeeStatus",
      "jobLevel",
      "feedback",
      
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }
        // Ensure that employeeID is not null or empty
    if (!body.empID || body.empID.trim() === '') {
      body.empID = generateEmployeeID();  // Generate employeeID if not provided
    }

    // Validate employeeID (check if it already exists)
    const existingIntern = await Intern.findOne({ empID: body.empID });
    if (existingIntern) {
      return res.status(400).json({ message: 'Intern with this Employee ID already exists.' });
    }
    // Create new intern
    const newIntern = new Intern({
      ...body,
      profileImage,
      Certificate: certificate,
    });

        

    // Save to database
    const savedIntern = await newIntern.save();
    res.status(201).json({ message: "Intern added successfully", data: savedIntern });
  } catch (error) {
    console.error("Error adding intern:", error);
    res.status(500).json({ message: "Error adding intern", error });
  }
};

// Get all interns
exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interns", error });
  }
};

// Get an intern by ID
exports.getInternById = async (req, res) => {
  try {
    const { id } = req.params;
    const intern = await Intern.findById(id);
    if (!intern) {
      return res.status(404).json({ message: "Intern not found" });
    }
    res.status(200).json(intern);
  } catch (error) {
    res.status(500).json({ message: "Error fetching intern", error });
  }
};

// Update an intern by ID
exports.updateIntern = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;

    // File paths
    const profileImage = files?.profileImage?.[0]?.path || null;
    const certificate = files?.Certificate?.[0]?.path || null;
      
      // Check for duplicate empID
    if (body.empID) {
      const existingIntern = await Intern.findOne({ empID: body.empID, _id: { $ne: id } });
      if (existingIntern) {
        return res.status(400).json({ message: `Employee ID "${body.empID}" already exists.` });
      }
    }

    const updateData = {
      ...body,
      ...(profileImage && { profileImage }),
      ...(certificate && { Certificate: certificate }),
    };

    const updatedIntern = await Intern.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }
    res.status(200).json({ message: "Intern updated successfully", data: updatedIntern });
  } catch (error) {
    res.status(500).json({ message: "Error updating intern", error });
  }
};

// Delete an intern by ID
exports.deleteIntern = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIntern = await Intern.findByIdAndDelete(id);
    if (!deletedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }
    res.status(200).json({ message: "Intern deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting intern", error });
  }
};
