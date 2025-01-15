const express = require("express");
const multer = require("../middlewares/multer"); 
const newsController = require("../controllers/newsControllerAdmin");

const router = express.Router();

//add news
router.post("/news", multer.single("newsFile"), newsController.addNewsDetails);

// get all news
router.get("/newsdetails", newsController.getAllNewsDetails);

// update a news
router.put("/news/:id", multer.single("newsFile"), newsController.editNewsDetails);

// Route to delete an employee by ID
router.delete("/newsdetails/:id", newsController.deleteANewsDetail);

module.exports = router;
