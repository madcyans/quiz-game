const router = require('express').Router();
const User   = require('../models/User');

router.get('/leaderboard', async (req, res) => {
  try {
    const top = await User.find()
      .sort({ highscore: -1 })
      .limit(10)
      .select('username highscore -_id');
    res.json(top);
  } catch (e) {
    console.error('Leaderboard error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;