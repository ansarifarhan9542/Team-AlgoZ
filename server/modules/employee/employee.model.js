const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    personalDetails: {
      fullName: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      dob: { type: Date },
      gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    },
    jobDetails: {
      designation: { type: String, default: '' },
      department: { type: String, default: '' },
      joiningDate: { type: Date },
      employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'intern', ''],
        default: '',
      },
    },
    salaryStructure: {
      basic: { type: Number, default: 0 },
      hra: { type: Number, default: 0 },
      allowances: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
    },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    profilePicture: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
