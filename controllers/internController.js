const Intern = require("../models/internSchema");


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
      "username",
      "employeeID",
      "email",
      "phone",
      "address",
      "gender",
      "dob",
      "bloodgroup",
      "doj",
      "jobrole",
      "empsatus",
      "joblevel",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
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
