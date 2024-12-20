const video = require("../models/videoSchema");

exports.addVideo = async (req, res) => {
  try {
    const { videourl } = req.body;
    if (videourl) {
      const newVideo = new video({ videourl });
      await newVideo.save();
      res.status(201).json("Video Added Successfully");
    } else {
      res.status(400).json("Please Enter Video URL");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const delvideo = await video.findByIdAndDelete(id);
      res.status(200).json("video deleted SuccessFully");
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
