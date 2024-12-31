const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
  username: { type: String, required: true },
  employeeID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodgroup: { type: String, required: true },
  doj: { type: Date, required: true },
  jobrole: { type: String, required: true },
  empsatus: { type: String, required: true },
  joblevel: { type: String, required: true },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  feedback: { type: String },
  profileImage: { type: String },
  Certificate: { type: String },
  }
);

module.exports = mongoose.model("Intern", internSchema);
