const SalesEmployee = require("../models/salesSchema");

// Add a new sales employee
exports.addSalesEmployee = async (req, res) => {
  try {
    const { body, files } = req;
    const profileImage = files?.profileImage?.[0]?.path || null;
    const businessCard = files?.businessCard?.[0]?.path || null;

    const newEmployee = new SalesEmployee({
      ...body,
      profileImage,
      businessCard,
    });

    const savedEmployee = await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", data: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error });
  }
};

// Get all employees
exports.getSalesEmployees = async (req, res) => {
  try {
    const employees = await SalesEmployee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};
