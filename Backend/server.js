// D:\CRM\Backend\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables at the very top
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes after dotenv is configured
const apiRoutes = require('./routes/api');
const admissionRoutes = require('./routes/admissionRoutes');
const paymentRoutes = require('./routes/paymentRoutes.js'); // Match your file name

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api', apiRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});