const express=require('express')
const {addForm,getForm} = require('../controllers/formController')
const router=express.Router()


//end point to submit form
router.post('/formSubmit',addForm)
//fetch form
router.get('/getforms',getForm)



module.exports=router;