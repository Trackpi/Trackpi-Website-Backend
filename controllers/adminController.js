const { response } = require("express")
const adminModel = require("../models/adminSchema")
const { use } = require("../routes/adminRouter")
const jwt =require('jsonwebtoken')
//getAllAdmin
exports.getadmins=(req,res)=>{
    adminModel.find()
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        console.log(err)
        res.status(406).json(response)
    })
}


//deleteAdmin
exports.deleteadmin=(req,res)=>{
    const user=req.user
    const adminid=req.params.id
   if(user)
   {
    adminModel.findOne({_id:user})
    .then(()=>{
        adminModel.findOneAndDelete({_id:adminid})
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err)
            res.status(406).json({err:'admin id not founded'})
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(406).json({err:'you dont have credintial'})
    })
   }
   else{
    res.status(406).json({err:'failed to delete'})
   }
}



//addadmin
exports.addadmin=(req,res)=>{
    const user=req.user
    const data=req.body
if(user && data.username && data.password &&data.adminType)
   {
    adminModel.findOne({_id:user})
    .then(()=>{
        adminModel.create(data)
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err)
            res.status(406).json(response)
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(406).json({err:'you dont have credintial'})
    })
   }
   else{
    res.status(406).json({err:'failed to add'})
   }
}


// edit admin

exports.editadmin=(req,res)=>{
    const user=req.user
    const data=req.body
    console.log(data)
if(user && data.username && data.password &&data.adminType)
   {
    adminModel.findOne({_id:user})
    .then(()=>{
       adminModel.findOne({username:data.username})
       .then(userdata=>{
        userdata.username=data.username
        userdata.password=data.password
        userdata.adminType=data.adminType
        adminModel.findOneAndUpdate({_id:userdata._id},userdata)
        .then(()=>{
            res.status(200).json(userdata)
        })
        .catch(err=>{
            console.log(err)
            res.status(406).json({err:'error to edit'})
        })
       })
       .catch(err=>{
        console.log(err)
        res.status(406).json({err:'error to edit'})
    })
    })
    .catch(err=>{
        console.log(err)
        res.status(406).json({err:'you dont have credintial'})
    })
   }
   else{
    res.status(406).json({err:'failed to add'})
   }
}



//admin login
exports.adminlogin=(req,res)=>{
    const data=req.body

    if(data.username && data.password)
    {
        adminModel.findOne({username:data.username})
        .then(response=>{
            if(response.password==data.password)
            {
             const jwtid=   jwt.sign({_id:response._id},process.env.JWT_KEY)
             res.status(200).json(jwtid)
            }
            else{
                res.stataus(406).json({err:'data not found'}) 
            }
        })
        .catch(err=>{
            res.status(406).json({err:'data not found'})
        })
    }
    else{
        res.stataus(406).json({err:'data not found'})
    }
}