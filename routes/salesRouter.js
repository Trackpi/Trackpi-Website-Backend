const express = require("express");
const upload = require("../middlewares/multer");
const verifyJWT = require('../middlewares/jwtMiddleware')
const salesController = require("../controllers/salesController");

const router = express.Router();


// Route to add a new sales record
router.post(
  "/",verifyJWT, upload.fields([
    { name: "image", maxCount: 1 },
    { name: "businessCard", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("Files received:", req.files);
    if (!req.files.image || !req.files.businessCard) {
      return res.status(400).json({ 
        status: 400, 
        message: "Required files are missing: image, businessCard" 
      });
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
  { name: "profileimage", maxCount: 1 },
  { name: "businesscard", maxCount: 1 },
]),salesController.updateSales);

// Route to delete a sales record by ID
router.delete("/:id", salesController.deleteSales);

module.exports = router;
