const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get current user’s data (protected)
router.get('/me', auth, async (req, res) => {
  try {
    // We're storing the user ID in req.user.id from the JWT
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) {
    console.error('Error fetching /me:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  console.log('Registering user:', req.body); // Debugging line to check request body
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    console.log('✅ User successfully created:', user);
    res.json({ msg: 'Registered' });
  } catch (e) {
    console.error('❌ Registration failed:', e);
    if (e.code === 11000) {
        res.status(400).json({ error: 'Username already taken' });
    } else {
        res.status(400).json({ error: e.message });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({ error: 'Invalid creds' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username, score: user.score });
});

module.exports = router;