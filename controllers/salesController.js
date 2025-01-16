const SalesEmployee = require("../models/salesSchema");

// Add a new sales employee
exports.addSalesEmployee = async (req, res) => {

  // console.log(req.userid)
  try {
    const { body, files } = req;

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
 // Check if empID is provided and valid
 if (!body.empID || body.empID.trim() === "") {
  return res.status(400).json({ message: "Employee ID is required" });
}

console.log("empID received:", body.empID);
// Check if any required fields are missing
for (const field of requiredFields) {
  if (!body[field]) {
    return res.status(400).json({ message: `Missing required field: ${field}` });
  }
}

// Check if empID is unique
const existingEmployee = await SalesEmployee.findOne({ empID: body.empID });
if (existingEmployee) {
  return res.status(400).json({ message: "Employee ID already exists" });
}

    // Extract file paths
    const profileImage = files?.profileImage?.[0]?.path || null;
    const businessCard = files?.businessCard?.[0]?.path || null;
    
   
   
    // Create new employee record
    const newEmployee = new SalesEmployee({
      ...body,
     
      profileImage,
      businessCard,
    });

    // Save to database
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).json({ message: "Error adding employee",details: error.message });
  }
};

// Get all sales employees
exports.getSalesEmployees = async (req, res) => {
  try {
    const newEmployees = await SalesEmployee.find();
    res.status(200).json(newEmployees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees", details: error.message });
  }
}

// Get a single sales employee by ID
exports.getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await SalesEmployee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

// Update a sales employee by ID
exports.updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;

    // Extract file paths
    const profileImage = files?.profileImage?.[0]?.path || undefined;
    const businessCard = files?.businessCard?.[0]?.path || undefined;
   // Check for duplicate empID
   if (body.empID) {
    const existingSalesEmployee = await SalesEmployee.findOne({ empID: body.empID, _id: { $ne: id } });
    if (existingSalesEmployee) {
      return res.status(400).json({ message: `Employee ID "${body.empID}" already exists.` });
    }
  }
    // Prepare update data
    const updateData = { ...body };
    if (profileImage) updateData.profileImage = profileImage;
    if (businessCard) updateData.businessCard = businessCard;

    const updatedEmployee = await SalesEmployee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// Delete a sales employee by ID
exports.deleteSales = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await SalesEmployee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
