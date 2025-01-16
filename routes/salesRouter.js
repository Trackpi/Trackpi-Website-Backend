const express = require("express");
const multer = require("../middlewares/multer"); 
const upload = require("../middlewares/multer");
const verifyJWT = require('../middlewares/jwtMiddleware')
const salesController = require("../controllers/salesController");

const router = express.Router();


// Route to add a new sales record
router.post(
  "/salesemployee",verifyJWT,  upload.fields([
    { name: "profileImage"}, // Match this with the frontend
    { name: "businessCard" },
  ]), salesController.addSalesEmployee
);



// Route to get all sales records
router.get("/salesemployee", salesController.getSalesEmployees);

// // Route to get a single sales record by ID
// router.get("/salesemployee/:id", salesController.getSalesById);

// Route to update a sales record by ID
router.put("/salesemployee/:id",  upload.fields([
  { name: "profileImage" }, // Match this with the frontend
  { name: "businessCard"},
]),salesController.updateSales);

// Route to delete a sales record by ID
router.delete("/salesemployee/:id", salesController.deleteSales);

module.exports = router;
