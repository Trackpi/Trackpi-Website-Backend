const Intern = require("../models/internSchema");
// Function to generate a unique employeeID if not provided

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
      
      
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }
    // Check if empID is provided and valid
 if (!body.empID || body.empID.trim() === "") {
  return res.status(400).json({ message: "Employee ID is required" });
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
   await newIntern.save();
    res.status(201).json({ message: "Intern added successfully",newIntern  });
  } catch (error) {
    console.error("Error adding intern:",  error.message);
    res.status(500).json({ message: "Error adding intern", details: error.message });
  }
};

// Get all interns
exports.getAllInterns = async (req, res) => {
  try {
    const newInterns = await Intern.find();
    res.status(200).json(newInterns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interns", details: error.message });
  }
};

// Get an intern by ID
exports.getInternById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the provided ID is a valid ObjectId
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid ID format" });
}

// Proceed with the query after ensuring the ID is valid

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

    const updateData = { ...body}
    if (profileImage) updateData.profileImage = profileImage;
    if (certificate) updateData.Certificate = certificate;
      
    

    const updatedIntern = await Intern.findByIdAndUpdate(id, updateData, { new: true ,
      runValidators: true,});
    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }
    res.status(200).json({ message: "Intern updated successfully", data: updatedIntern });
    
  } catch (error) {
    console.error("Error updating intern:", error.message);
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