const express=require('express')
const adminControler = require('../controllers/adminController')
const verifyJwt = require('../middlewares/jwtMiddleware')
const router=express.Router()

//get admin
router.get('/admin',adminControler.getadmins)

//delete admin
router.delete('/admin/:id',verifyJwt,adminControler.deleteadmin)

//add admin
router.post('/admin',verifyJwt,adminControler.addadmin)

//edit admin
router.put('/admin',verifyJwt,adminControler.editadmin)


//login admin
router.post('/adminlogin',adminControler.adminlogin)

module.exports=router