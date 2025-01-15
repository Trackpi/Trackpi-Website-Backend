const mongoose = require("mongoose");

const salesEmployeeSchema = new mongoose.Schema({
  image:{type:String},
  businessCard:{type:String},
  name: { type: String, required: true },
  empID: { type: String, unique: true , required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  fullAddress: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  jobRole: { type: String, required: true },
  employeeStatus: { type: String, required: true },
  jobLevel: { type: String, required: true },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
 
});

module.exports = mongoose.model("SalesEmployee", salesEmployeeSchema);
