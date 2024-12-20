const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
});

const video = mongoose.model("videos", VideoSchema);

module.exports = video;
