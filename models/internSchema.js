const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: { type: String,  },
    empID: { type: String },
    email: { type: String, },
    phone: { type: String, },
    fullAddress: { type: String },
    gender: { type: String },
    dob: { type: Date },
    bloodGroup: { type: String },
    dateOfJoining: { type: Date},
    jobRole: { type: String},
    employeeStatus: { type: String},
    jobLevel: { type: String},
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  feedback: { type: String },
  profileImage: { type: String },
  Certificate: { type: String },
  }
);


const Intern = mongoose.model('Intern', internSchema);
module.exports = Intern;