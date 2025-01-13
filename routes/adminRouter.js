const express=require('express')
const adminControler = require('../controllers/adminController')
const verifyJwt = require('../middlewares/jwtMiddleware')
const router=express.Router()

//get admin
router.get('/admin',verifyJwt,adminControler.getAdmins)

//delete admin
router.delete('/admin/:id',verifyJwt,adminControler.deleteAdmin)

//add admin
router.post('/admin',verifyJwt,adminControler.addAdmin)

//edit admin
router.patch('/admin/:id',verifyJwt,adminControler.editAdmin)


//login admin
router.post('/adminlogin',adminControler.adminLogin)

//Status Update of Admin
router.patch('/updateStatus/:id',verifyJwt,adminControler.adminStatusUpdate)


module.exports=router