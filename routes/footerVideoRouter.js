const express = require("express");
const multer = require("../middlewares/multer"); 
const footerVideoController = require("../controllers/footerVideoController");

const router = express.Router();

//add footer 
router.post("/footer", multer.single("uploadedFile"), footerVideoController.addFooterVideoDetails);


module.exports = router;