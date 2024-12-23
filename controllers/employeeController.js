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

    const photo = req.file ? `/uploads/${req.file.filename}` : null;

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

    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (err) {
    res.status(500).json({ error: "Error adding employee", details: err.message });
  }
};

// Update Employee
exports.updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

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

// Delete Employee
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