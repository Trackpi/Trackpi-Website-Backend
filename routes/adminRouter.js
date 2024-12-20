const express=require('express')
const adminControler = require('../controllers/adminController')
const verifyJwt = require('../middlewares/jwtMiddleware')
const router=express.Router()

//getadmin
router.get('/getadmins',adminControler.getadmins)

//deleteadmin
router.delete('/deleteadmin',verifyJwt,adminControler.deleteadmin)

//addadmin
router.post('/addadmin',verifyJwt,adminControler.addadmin)



module.exports=router