const { response } = require("express")
const adminModel = require("../models/adminSchema")

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
    const adminid=req.body.adminid
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
    const {data}=req.body
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

