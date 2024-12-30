const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    fullAddress: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    jobRole: { type: String, required: true },
    employeeStatus: {
      type: String,
      enum: ["Full time", "Part time"],
      required: true,
    },
    jobLevel: { type: String, required: true },
    socialLinks: {
      instagram: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
    feedback: { type: String },
    profileImage: { type: String },
    certificate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
