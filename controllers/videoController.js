const video = require("../models/videoSchema");

exports.addVideo = async (req, res) => {
  try {
    // Validate if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const videoUrl = req.file.path; // Get the uploaded file path

    const newVideo = new video({ videoUrl });
    await newVideo.save();

    res.status(201).json({ message: "Video Added Successfully", video: newVideo });
  } catch (err) {
    console.error("Error adding video:", err.message);
    res.status(500).json({ error: "An error occurred while adding the video" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const delvideo = await video.findByIdAndDelete(id);
      res.status(200).json("video deleted SuccessFully", delvideo);
    } else {
      res.status(500).json("Video not found!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
