const mongoose = require("mongoose");

const salesEmployeeSchema = new mongoose.Schema({
  image:{type:String},
  businessCard:{type:String},
  name: { type: String },
  empID: { type: String},
  email: { type: String },
  phone: { type: String },
  fullAddress: { type: String},
  gender: { type: String },
  dob: { type: Date },
  bloodGroup: { type: String },
  dateOfJoining: { type: Date},
  jobRole: { type: String },
  employeeStatus: { type: String},
  jobLevel: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
 
});


const SalesEmployee = mongoose.model('SalesEmployee', salesEmployeeSchema);
module.exports =SalesEmployee
