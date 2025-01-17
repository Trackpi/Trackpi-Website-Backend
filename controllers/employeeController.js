const Employee = require("../models/employeeSchema");

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { body, files } = req;
    const {
      
      name,
      empID,
      email,
      desig,
      phone,
      category,
      fullAddress,
      gender,
      dob,
      bloodGroup,
      dateOfJoining,
      jobRole,
      employeeStatus,
      jobLevel,
      selfIntroduction,
      socialmedia1,
      socialmedia2,
      socialmedia3,
      socialmedia4,
      platform1,
      platform2,
      platform3,
      platform4,
      feedback,
    } = req.body;
// Process feedback to ensure it's stored as a newline-separated string
const processedFeedback = Array.isArray(feedback) ? feedback.join('\n') : feedback;
     // Auto-generate empID if not provided
     const generatedEmpID = empID || `EMP${Date.now()}`;

   // Check for duplicate empID
    const existingEmployee = await Employee.findOne({ empID: generatedEmpID });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }
    const image = req.files?.image?.[0]?.filename ? `/uploads/employees/${req.files.image[0].filename}` : null;
    const profileImage = req.files?.profileImage?.[0]?.filename ? `/uploads/employees/${req.files.profileImage[0].filename}` : null;
    const businessCard = req.files?.businessCard?.[0]?.filename ? `/uploads/employees/${req.files.businessCard[0].filename}` : null;
    const certificate = req.files?.Certificate?.[0]?.filename ? `/uploads/employees/${req.files.Certificate[0].filename}` : null;
    
    const employee = new Employee({
      empID: generatedEmpID,
      name,
      email,
      category,
      desig,
      profileImage,
      Certificate: certificate,
      image,
      phone,
      fullAddress,
      gender,
      dob,
      businessCard,
      bloodGroup,
      dateOfJoining,
      jobRole,
      employeeStatus,
      jobLevel,
      selfIntroduction,
      socialmedia1,
      socialmedia2,
      socialmedia3,
      socialmedia4,
      platform1,
      platform2,
      platform3,
      platform4,
      feedback:processedFeedback,
    });

    await employee.save();
    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: "Error adding employee", details: error.message });
  }
};

// Update Employee by ID
exports.updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { empID, feedback, ...updates } = req.body;
    
 
    const { files } = req;
    // Fetch the existing employee
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Check for duplicate empID if provided
    if (empID) {
      const duplicateEmployee = await Employee.findOne({
        empID,
        _id: { $ne: id }, // Exclude the current employee's ID
      });
      if (duplicateEmployee) {
        return res
          .status(400)
          .json({ message: "Employee ID already exists." });
      }
    }
   

     // Prepare updated data
     const image = req.files?.image?.[0]?.filename ? `/uploads/employees/${req.files.image[0].filename}` : existingEmployee.image;
     const profileImage = req.files?.profileImage?.[0]?.filename ? `/uploads/employees/${req.files.profileImage[0].filename}` : existingEmployee.profileImage;
     const businessCard = req.files?.businessCard?.[0]?.filename ? `/uploads/employees/${req.files.businessCard[0].filename}` : existingEmployee.businessCard;
     const certificate = req.files?.Certificate?.[0]?.filename ? `/uploads/employees/${req.files.Certificate[0].filename}` : existingEmployee.Certificate;
     const processedFeedback = Array.isArray(feedback) ? feedback.join('\n') : feedback;

    const updatedData = {
      ...req.body,
      image,
      profileImage,
      businessCard,
      Certificate: certificate,
      feedback: processedFeedback,
     
    };


    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.error('Error submitting employee data:', error);
    console.error("Network error. Please try again.");
    res.status(500).json({ error: "Network error. Please try again." });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { category } = req.query; // Fetch category from query params
    const filter = category ? { category } : {};
    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees", details: error.message });
  }
};

// Delete Employee by ID
exports.deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee", details: error.message });
  }
};
