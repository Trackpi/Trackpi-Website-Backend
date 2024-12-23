const Employee = require("../models/employeeSchema");

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const {
      empID,
      empName,
      designation,
      description,
      socialMediaLinks,
      emptype,
    } = req.body;

    // Get the uploaded file path
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    // Create new employee
    const employee = new Employee({
      empID,
      empName,
      designation,
      photo,
      description,
      socialMediaLinks,
      emptype,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the updated photo if uploaded
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Merge the updates with the new photo path
    const updatedData = {
      ...req.body,
      ...(photo && { photo }),
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating employee", details: error.message });
  }
};

// Get all employees

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees
    res.status(200).json(employees); // Return employees as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching employees", details: error.message });
  }
};

// Delete an employee by ID
exports.deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request params
    const deletedEmployee = await Employee.findByIdAndDelete(id); // Delete employee by ID

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting employee", details: error.message });
  }
};
