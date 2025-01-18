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
       
    },
    image: {
        type: String, 
    },
    selfIntroduction: {
        type: String,
    },
    phone: { type: String, },
    fullAddress: { type: String },
    gender: { type: String },
    dob: { type: Date },
    bloodGroup: { type: String },
    dateOfJoining: { type: Date},
    jobRole: { type: String},
    employeeStatus: { type: String},
    jobLevel: { type: String},
   socialmedia1:{
    type:String
   },
   socialmedia2:{
    type:String
   },
   socialmedia3:{
    type:String
   },
   socialmedia4:{
    type:String
   },
   category: { type: String, enum: ['employee', 'sales', 'intern'] },
   platform1:{type:String},
   platform2:{type:String},
   platform3:{type:String},
   platform4:{type:String},
   feedback: {  type:String, default:'' },
  profileImage: { type: String },
  Certificate: { type: String },
  image:{type:String},
  businessCard:{type:String},
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
