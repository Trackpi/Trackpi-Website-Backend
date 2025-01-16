const express = require("express");
const multer = require("../middlewares/multer"); 
const employeeController = require("../controllers/employeeController");

const router = express.Router();

// Route to get all employees
router.get("/employees", employeeController.getAllEmployees);


// Route to add an employee
router.post("/employees", multer.single("image"), employeeController.addEmployee);



// Route to update an employee by ID
router.put("/employees/:id", multer.single("image"), employeeController.updateEmployeeById);

// Route to delete an employee by ID
router.delete("/employees/:id", employeeController.deleteEmployeeById);

module.exports = router;
