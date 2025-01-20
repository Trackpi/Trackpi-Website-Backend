const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empID: {
        type: String,
        
        unique: true,
        validate: {
            validator: function (v) {
              // Ensures empID starts with "TPE1D" followed by exactly 6 digits
              return /^TPE1D\d{6}$/.test(v);
            },
            message: "Employee ID must start with 'TPE1D' followed by 6 digits (e.g., TPE1D123456).",
          },
    },
    name: {
        type: String,
        required: true,
        minlength: [3, "Full name must be at least 3 characters long"],
        maxlength: [64, "Full name cannot be longer than 64 characters"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid email address",
    },
        
    },
    desig: {
        type: String,
       
    },
    image: {
        type: String, 
      
    },
    selfIntroduction: {
        type: String,
        validate: {
            validator: function (v) {
                const wordCount = v.trim().split(/\s+/).length; // Count words
                const charCount = v.length; // Count characters
    
                return wordCount >= 50 && charCount <= 540; // Validate both
            },
            message: "Self-introduction must be between 50 words and 540 characters.",
        },
    },
    
    phone: { 
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            // Country code should start with a '+' followed by 1-3 digits, and the phone number should be 7-12 digits.
            return /^\+\d{1,3}\s\d{7,12}$/.test(v);
          },
          message: "Phone number must include a valid country code (e.g., +91 9876543210) and be 7 to 12 digits long.",
        },
     },
    fullAddress: { type: String,
        minlength: [6, "Address must be at least 6 characters long."],
     },
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
  profileImage: { type: String ,
    
  },
  Certificate: { type: String },
  image:{type:String},
  businessCard:{type:String},
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
