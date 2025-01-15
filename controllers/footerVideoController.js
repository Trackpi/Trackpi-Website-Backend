const footerVideo = require('../models/footerVideoSchema'); // Adjust the path as needed

exports.addFooterVideoDetails = async (req, res) => {
    const { videoCategory, videoUrl, videoFile, footerBannerImage } = req.body;

    const uploadedFile = req.file ? `/uploads/videos/${req.file.filename}` : videoFile;

    try {
        // Ensure at least one field to add
        if (!videoCategory && !footerBannerImage) {
            return res.status(400).json({ error: "Either videoCategory or footerBannerImage must be provided" });
        }

        // If adding a video to a category
        if (videoCategory) {
            if (!['footerVideo1', 'footerVideo2', 'footerVideo3'].includes(videoCategory)) {
                return res.status(400).json({ error: "Invalid video category" });
            }
            if (!videoUrl) {
                return res.status(400).json({ error: "videoUrl is required" });
            }

            const newVideo = {
                videoUrl,
                videoFile: uploadedFile,
            };

            const updatedDocument = await footerVideo.findOneAndUpdate(
                {},
                { $push: { [videoCategory]: newVideo } },
                { new: true, upsert: true, runValidators: true }
            );

            return res.status(200).json(updatedDocument);
        }

        // If adding or updating the banner image
        if (footerBannerImage) {
            const updatedDocument = await footerVideo.findOneAndUpdate(
                {},
                { footerBannerImage },
                { new: true, upsert: true, runValidators: true }
            );

            return res.status(200).json(updatedDocument);
        }
    } catch (error) {
        console.error("Error adding footer video details:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}



// exports.editFooterVideoDetails = async (req, res) => {
//     const { id } = req.params; // ID of the document to update
//     const { videoCategory, videoIndex, videoUrl, videoFile, footerBannerImage } = req.body;

//     const uploadedFile = req.file ? `/uploads/videos/${req.file.filename}` : videoFile;

//     try {
//         if (!id) {
//             return res.status(400).json({ error: "Document ID is required" });
//         }

//         // Check which part of the document to update
//         const updateQuery = {};
//         if (videoCategory && videoIndex !== undefined) {
//             if (!['footerVideo1', 'footerVideo2', 'footerVideo3'].includes(videoCategory)) {
//                 return res.status(400).json({ error: "Invalid video category" });
//             }

//             // Dynamically construct the path for the array update
//             const pathToUpdate = `${videoCategory}.${videoIndex}`;
//             updateQuery[pathToUpdate] = {
//                 videoUrl,
//                 videoFile: uploadedFile,
//             };
//         }

//         if (footerBannerImage) {
//             updateQuery.footerBannerImage = footerBannerImage;
//         }

//         if (Object.keys(updateQuery).length === 0) {
//             return res.status(400).json({ error: "No valid fields to update" });
//         }

//         const updatedDocument = await footerVideo.findByIdAndUpdate(
//             id,
//             { $set: updateQuery },
//             { new: true, runValidators: true }
//         );

//         if (!updatedDocument) {
//             return res.status(404).json({ error: "Document not found" });
//         }

//         res.status(200).json(updatedDocument);
//     } catch (error) {
//         console.error("Error updating footer video details:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
