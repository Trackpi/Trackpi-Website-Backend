// routes/footerVideoRoutes.js
const express = require('express');
const multer = require('../middlewares/multer');
const footerVideoController = require('../controllers/footerVideoController');

const router = express.Router();

// router.post(
//     "/addfooterdetails",
//     multer.fields([
//       { name: "videos", maxCount: 3 }, // Allow up to 3 videos
//       { name: "image", maxCount: 1 }, // Allow a single image
//     ]),
//     footerVideoController.addFooterVideoDetails
//   );
// update
router.put("/updatefooterdetails", footerVideoController.updateFooterDetails);
module.exports = router;
