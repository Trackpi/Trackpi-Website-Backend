const Employee = require("../models/employeeSchema");
const { v4: uuidv4 } = require('uuid');
// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    const {
      
      name,
      email,
      desig,
      selfIntroduction,
      socialMediaLinks,
    } = req.body;
    const empID = uuidv4(); // Generate a unique empID
    const image = req.file ? `/uploads/employees/${req.file.filename}` : null;

    const employee = new Employee({
      empID,
      name,
      email,
      desig,
      image,
      selfIntroduction,
      socialMediaLinks: JSON.parse(socialMediaLinks || '{}'),
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
    const uploadedImage = req.file ? `/uploads/employees/${req.file.filename}` : image;
    console.log('Uploaded File Path:', photo);
    const updatedData = {
      ...req.body,
      ...(image && { image: uploadedImage }),
      socialMediaLinks: req.body.socialMediaLinks
        ? JSON.parse(req.body.socialMediaLinks)
        : undefined,
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
    res.status(400).json({ error: "Error updating employee", details: error.message });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
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
