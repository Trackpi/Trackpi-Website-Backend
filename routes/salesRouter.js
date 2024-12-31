const express = require("express");
const upload = require("../middlewares/multer");
const router = express.Router();
const salesController = require("../controllers/salesController");

// Route to add a new sales record
router.post(
  "/add",  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "businessCard", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("Files received:", req.files);
    if (!req.files.profileImage || !req.files.businessCard) {
      return res.status(400).json({ message: "Required files missing" });
    }
    next();
  },
  salesController.addSalesEmployee
);



// Route to get all sales records
router.get("/", salesController.getSalesEmployees);

// Route to get a single sales record by ID
router.get("/:id", salesController.getSalesById);

// Route to update a sales record by ID
router.put("/:id",  upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "businessCard", maxCount: 1 },
]),salesController.updateSales);

// Route to delete a sales record by ID
router.delete("/:id", salesController.deleteSales);

module.exports = router;
