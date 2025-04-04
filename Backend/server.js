const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const admissionRoutes = require('./routes/admissionRoutes'); // New import
const path = require('path'); // Added for static file serving

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS to match frontend port (5173)
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Debug route to confirm server is working
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Existing API routes
app.use('/api', apiRoutes);

// New admission routes
app.use('/api/admissions', admissionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});