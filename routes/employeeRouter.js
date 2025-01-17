const express = require("express");
const multer = require("../middlewares/multer"); 
const upload = require("../middlewares/multer");
const verifyJWT = require('../middlewares/jwtMiddleware');
const employeeController = require("../controllers/employeeController");

const router = express.Router();

// Route to get all employees
router.get("/employees", employeeController.getAllEmployees);


// Route to add an employee
router.post("/employees",  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "businessCard", maxCount: 1 },
    { name: "Certificate", maxCount: 1 },
  ]),
 employeeController.addEmployee);



// Route to update an employee by ID
router.put("/employees/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileImage", maxCount: 1 },
        { name: "businessCard", maxCount: 1 },
        { name: "Certificate", maxCount: 1 },
      ]),
 employeeController.updateEmployeeById);

// Route to delete an employee by ID
router.delete("/employees/:id", employeeController.deleteEmployeeById);

module.exports = router;
