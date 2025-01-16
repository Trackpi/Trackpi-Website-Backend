const FooterVideo = require('../models/footerVideoSchema');

// exports.addFooterVideoDetails = async (req, res) => {
//     const { url } =req.body
//     try {
//       // Validate file uploads
//       const videos = req.files.videos || [];
//       const image = req.files.image ? req.files.image[0] : null;
  
//       if (videos.length < 3) {
//         return res.status(400).json({ message: "3 videos are required." });
//       }
  
//       if (!image) {
//         return res.status(400).json({ message: "An image is required." });
//       }
  
//       // Process file paths
//       const videoDetails = videos.map((video) => ({
//         fileName: `/uploads/footer/${video.filename}`,
//         url: url,
//       }));
  
//       const imageDetails = {
//         file: image.filename,
//         url: `/uploads/footer/${image.filename}`,
//       };
  
//       // Save to the database
//       let footerVideo = await FooterVideo.findOne();
//       if (!footerVideo) {
//         footerVideo = new FooterVideo({ videos: videoDetails, image: imageDetails });
//       } else {
//         footerVideo.videos = videoDetails;
//         footerVideo.image = imageDetails;
//       }
  
//       await footerVideo.save();
  
//       res.status(201).json({ message: "Footer details added successfully", footerVideo });
//     } catch (err) {
//       console.error("Error adding footer video details:", err.message);
//       res.status(500).json({ error: "An error occurred while adding footer details" });
//     }
//   };


exports.updateFooterDetails = async (req, res) => {
  try {
    const { heading, videos } = req.body;

    let footerVideo = await FooterVideo.findOne();
    if (!footerVideo) {
      footerVideo = new FooterVideo(); // If no record exists, create a new one
    }

    // Update the heading if provided
    if (heading) {
      footerVideo.heading = heading;
    }

    // Update the videos if provided
    if (videos && Array.isArray(videos)) {
      videos.forEach((video, index) => {
        if (footerVideo.videos[index]) {
          // Update existing video
          footerVideo.videos[index].fileName = video.fileName || footerVideo.videos[index].fileName;
          footerVideo.videos[index].url = video.url || footerVideo.videos[index].url;
        } else {
          // Add new video if less than 3
          footerVideo.videos.push(video);
        }
      });

      // Ensure the length of videos array is <= 3
      footerVideo.videos = footerVideo.videos.slice(0, 3);
    }

    await footerVideo.save();
    res.status(200).json({ message: "Footer details updated successfully", footerVideo });
  } catch (err) {
    console.error("Error updating footer details:", err.message);
    res.status(500).json({ error: "An error occurred while updating footer details" });
  }
};
