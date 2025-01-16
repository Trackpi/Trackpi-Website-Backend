const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  projectName: { type: String, required: true },
  problemSolved: { type: String, required: true },
  beneficiaries: { type: String, required: true },
  successReason: { type: String, required: true },
  skills: { type: String, required: true },
  summary: { type: String, required: true },
  file: { type: String }, // Added for file URL
  fileName:{type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
