const express = require('express');
const router = express.Router();
const Lead = require('../model/Lead');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware (still needed for other routes, but not for GET /leads)
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /leads - Capture a new lead
router.post('/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving lead', error: err.message });
  }
});

// GET /leads - Fetch all leads (no authentication required)
router.get('/leads', async (req, res) => { // Removed authMiddleware
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leads', error: err.message });
  }
});

// POST /auth/signup - User signup
router.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'Signup successful', user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// POST /auth/login - User login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// GET /auth/me - Fetch authenticated user
router.get('/auth/me', authMiddleware, async (req, res) => {
  res.json(req.user);
});

module.exports = router;