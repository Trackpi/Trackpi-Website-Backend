const express = require("express");
const videoController = require("../controllers/videoController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/addVideo", upload.single('file'), (req, res, next) => {
    console.log("File received:", req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    next();
}, videoController.addVideo);
router.get("/getVideos", videoController.getAllVideos);
router.delete("deleteVideo/:id", videoController.deleteVideo);

module.exports = router;
