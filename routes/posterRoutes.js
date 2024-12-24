
const express = require('express');
const router = express.Router();
const posterController = require('../controllers/posterController');
const upload = require('../middlewares/multer'); // Import shared multer configuration

// Routes for Poster Controller
router.post('/createPoster', upload.single('posterimage'), posterController.createPoster);
router.get('/getAllPosters', posterController.getAllPosters);
router.get('/getPosterById/:id', posterController.getPosterById);
router.patch('/updatePoster/:id', upload.single('posterimage'), posterController.updatePoster);
router.delete('/deletePoster/:id', posterController.deletePoster);

module.exports = router;
