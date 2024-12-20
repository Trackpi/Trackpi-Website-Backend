const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

router.post("/addVideo", videoController.addVideo);
router.get("/getVideos", videoController.getAllVideos);
router.delete("deleteVideo/:id", videoController.deleteVideo);

module.exports = router;
