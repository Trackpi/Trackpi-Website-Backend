const express = require("express");
const upload = require("../middlewares/multer");
const router = express.Router();
const internController = require("../controllers/internController");

router.get(
  "/",
  upload.array("file"),
  (req, res, next) => {
    console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    next();
  },
  internController.getAllInterns
);
router.post("/", internController.addIntern);
router.put("/:id", internController.updateIntern);
router.delete("/:id", internController.deleteIntern);

module.exports = router;
