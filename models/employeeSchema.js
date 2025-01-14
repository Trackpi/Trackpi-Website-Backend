const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empID: {
        type: String,
        
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        
    },
    desig: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
    },
    selfIntroduction: {
        type: String,
    },
    socialMediaLinks: {
        facebook: { type: String, trim: true },
        instagram: { type: String, trim: true },
        linkedin: { type: String, trim: true },
    },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
