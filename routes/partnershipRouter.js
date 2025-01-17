const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const upload = require('../middlewares/multer'); 

// post a partner detail
router.post('/createpartner', upload.single('companylogo'), partnerController.createPartner);

// get all partner detail
router.get('/getpartner', partnerController.getAllPartners);

// delete a partner detail
router.delete('/deletepartner/:id', partnerController.deletePartner);

// update a partner detail
router.patch('/updatepartner/:id', upload.single('companylogo'), partnerController.updatePartner);

module.exports = router;