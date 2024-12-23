const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
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
        enum : ['Intern','Employee'],
        required:true
    }
},{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;