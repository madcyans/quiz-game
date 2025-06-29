const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/debug', (_, res) => {
  res.json({ message: 'API is alive and responding' });
});
// Root endpoint
// GET /api/trivia/
router.get('/', (req, res) => {
  res.json({ message: 'Trivia API is live!' });
});

// Fetch a random question
router.get('/question', async (req, res) => {
  try {
    // use `.countDocuments()` instead of `.count()`
    const count = await Question.countDocuments();
    const rand  = Math.floor(Math.random() * count);
    const q     = await Question.findOne().skip(rand);

    if (!q) return res.status(404).json({ error: 'No questions found' });
    res.json({ id: q._id, text: q.text, choices: q.choices });
  } catch (e) {
    console.error('Error fetching question:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit answer (protected)
router.post('/answer', auth, async (req, res) => {
  // req.body: { questionId, answer, wrongCount }
  const { questionId, answer, wrongCount } = req.body;
  try {
    const q = await Question.findById(questionId);
    if (!q) return res.status(404).json({ error: 'Question not found' });

    const correct = q.answer === answer;
    const user = await User.findById(req.user.id);

    // record history
    user.history.push({
      question: q.text,
      yourAnswer: answer,
      correct,
      timestamp: new Date()
    });

    // update score or wrongCount
    if (correct) {
      user.score += 1;
    }

    // check game over
    const newWrong = wrongCount + (correct ? 0 : 1);
    let gameOver = false;

    if (newWrong >= 3) {
      gameOver = true;
      // update highscore if needed
      if (user.score > user.highscore) {
        user.highscore = user.score;
      }
      // reset current score for next session
      user.score = 0;
    }

    await user.save();

    return res.json({
      correct,
      currentScore: user.score,
      wrongCount: newWrong,
      gameOver,
      highscore: user.highscore
    });
  } catch (e) {
    console.error('Answer error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/trivia/finish
router.post('/finish', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Promote current score to highscore if it’s bigger
    if (user.score > user.highscore) {
      user.highscore = user.score;
    }
    const highscore = user.highscore;

    // Reset for next session
    user.score = 0;
    await user.save();

    res.json({ highscore });
  } catch (e) {
    console.error('Finish error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;