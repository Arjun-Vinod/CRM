const express = require('express');
const router = express.Router();
const Admission = require('../model/Admission');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = {
      'photoId': ['image/jpeg', 'image/png'],
      'proofDocument': ['application/pdf'],
      'certificate': ['application/pdf'],
      'resume': [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      'experienceCertificate': ['application/pdf']
    };
    
    const fileType = file.fieldname; // Use file.fieldname instead of req.body.fileType
    if (!allowedTypes[fileType] || !allowedTypes[fileType].includes(file.mimetype)) {
      return cb(new Error(`Invalid file type for ${fileType}`));
    }
    cb(null, true);
  }
});

// Upload admissions
router.post('/upload', upload.fields([
  { name: 'photoId', maxCount: 1 },
  { name: 'proofDocument', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'experienceCertificate', maxCount: 1 }
]), async (req, res) => {
  try {
    const { userDetails } = req.body;
    const parsedUserDetails = JSON.parse(userDetails);
    
    const filesData = Object.entries(req.files).map(([type, [file]]) => ({
      name: file.originalname,
      type,
      url: `/uploads/${file.filename}`,
      uploadDate: new Date(),
      encrypted: true,
      auditTrail: [{
        action: 'Uploaded',
        user: 'Current User',
        timestamp: new Date()
      }]
    }));

    const admission = new Admission({
      userDetails: parsedUserDetails,
      files: filesData
    });

    await admission.save();
    res.status(201).json({ message: 'Admission uploaded successfully', admission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading admission', error: error.message });
  }
});

// Get all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error: error.message });
  }
});

module.exports = router;