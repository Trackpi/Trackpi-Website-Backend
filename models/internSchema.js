const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
    empID:{
        type:Number,
        required:true,
        unique:true
    },
    empName:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        
    },
    description:{
        type:String
    },
    socialMediaLinks: {
        facebook: { type: String, trim: true },
        instagram: { type: String, trim: true },
        linkedin: { type: String, trim: true },
    },
    emptype:{
        type:String,
        enum : ['Intern','Sales'],
        required:true
    }
},{Timestamps:true})

const Intern = mongoose.model('Interns',internSchema)
module.exports = Intern;