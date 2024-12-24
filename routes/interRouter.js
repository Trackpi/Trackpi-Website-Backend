const express = require("express");
const multer = require("../middlewares/multer"); 
const internController = require("../controllers/internController");

const router = express.Router();

// Route to add an intern
router.post("/interns", multer.single("image"), internController.addIntern);

// Route to get all interns
router.get("/interns", internController.getAllInterns);

// Route to update an intern by ID
router.put("/interns/:id", multer.single("image"), internController.updateInternById);

// Route to delete an intern by ID
router.delete("/interns/:id", internController.deleteInternById);

module.exports = router;
