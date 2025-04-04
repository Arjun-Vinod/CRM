const mongoose = require('mongoose');

const auditTrailSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const admissionSchema = new mongoose.Schema({
  userDetails: {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, enum: ['student', 'professional'], required: true },
    highestDegree: { type: String },
    marksObtained: { type: String },
    company: { type: String },
    yearsOfExperience: { type: String }
  },
  files: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    encrypted: { type: Boolean, default: true },
    auditTrail: [auditTrailSchema],
    version: { type: Number, default: 1 }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);