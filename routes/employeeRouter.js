const express = require('express')

const employeeController = require('../controllers/employeeController')
const upload = require('../middlewares/multer')

const router = express.Router()

router.post("/employees", upload.single("image"), employeeController.addEmployee);
router.get("/employees", employeeController.getAllEmployees);
router.put("/employees/:id", upload.single("image"), employeeController.updateEmployeeById);
router.delete("/employees/:id", employeeController.deleteEmployeeById);


module.exports = router;
