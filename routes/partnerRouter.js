const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const upload = require('../middlewares/multer'); // Import shared multer configuration

// Routes for Partner Controller
router.post('/createPartner', upload.single('companylogo'), partnerController.createPartner);
router.get('/getAllPartners', partnerController.getAllPartners);
router.get('/getPartnerById/:id', partnerController.getPartnerById);
router.patch('/updatePartner/:id', upload.single('companylogo'), partnerController.updatePartner);
router.delete('/deletePartner/:id', partnerController.deletePartner);

module.exports = router;
