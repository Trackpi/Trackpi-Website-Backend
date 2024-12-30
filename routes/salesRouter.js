const express = require("express");
const upload = require("../middlewares/multer");
const router = express.Router();
const salesController = require("../controllers/salesController");

// Route to add a new sales record
router.post(
  "/add",
  upload.array("file"),
  (req, res, next) => {
    console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    next();
  },
  salesController.addSales
);

// Route to get all sales records
router.get("/", salesController.getAllSales);

// Route to get a single sales record by ID
router.get("/:id", salesController.getSalesById);

// Route to update a sales record by ID
router.put("/:id", upload, salesController.updateSales);

// Route to delete a sales record by ID
router.delete("/:id", salesController.deleteSales);

module.exports = router;
