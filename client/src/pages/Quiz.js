// client/src/pages/Quiz.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate }                    from 'react-router-dom';
import API                                from '../api';
import { AuthContext }                    from '../AuthContext';

export default function Quiz() {
  // enforce auth
  useContext(AuthContext);

  const navigate = useNavigate();

  const [q, setQ]                   = useState(null);
  const [asked, setAsked]           = useState(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback]     = useState(null);   // "correct"|"wrong"
  const [correctCount, setCorrectCount] = useState(0);
  const [error, setError]           = useState('');

  const totalQuestions = 20;
  const maxWrong       = 3;

  // Fetch a fresh question when we need one
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await API.get('/trivia/question');
        if (asked.has(data.id)) {
          // skip duplicates
          return fetchQuestion();
        }
        setQ(data);
      } catch (e) {
        console.error('Could not load question', e);
        setError('Could not load question.');
      }
    };

    // only fetch if:
    // 1) we don’t have a question loaded,
    // 2) no feedback blocking us,
    // 3) we haven’t hit game over by wrongCount,
    // 4) we haven’t exhausted all questions.
    if (!q && feedback === null && wrongCount < maxWrong && asked.size < totalQuestions) {
      fetchQuestion();
    }
  }, [q, asked, feedback, wrongCount]);

  const handleAnswer = async (choice) => {
    if (!q) return;

    try {
      const { data } = await API.post('/trivia/answer', {
        questionId: q.id,
        answer: choice,
        wrongCount
      });

      // compute new correct count immediately
      const isCorrect       = data.correct;
      const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
      setCorrectCount(newCorrectCount);

      // show feedback & update state
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setWrongCount(data.wrongCount);
      setAsked(prev => new Set(prev).add(q.id));

      // after a brief pause, decide: wrong-out, done-with-20, or next
      setTimeout(async () => {
        // A) ended by 3 wrongs
        if (data.gameOver) {
          // finish on server, reset score, grab highscore
          const { data: finishData } = await API.post('/trivia/finish');
          navigate('/gameover', {
            state: {
              reason: 'wrong',
              finalScore: newCorrectCount,
              highscore:  finishData.highscore
            }
          });
          return;
        }

        // B) answered the 20th question
        if (asked.size + 1 >= totalQuestions) {
          const { data: finishData } = await API.post('/trivia/finish');
          navigate('/gameover', {
            state: {
              reason: 'done',
              finalScore: newCorrectCount,
              highscore:  finishData.highscore
            }
          });
          return;
        }

        // C) keep going
        setFeedback(null);
        setQ(null);
      }, 1500);

    } catch (e) {
      console.error('Submit answer failed', e);
      setError('Could not submit your answer.');
    }
  };

  if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;
  if (!q)    return <p className="mt-10 text-center">Loading…</p>;

  return (
    <>
      {/* Quiz Card */}
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{q.text}</h2>

        <div className="space-y-3">
          {q.choices.map(choice => (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={!!feedback}
              className="w-full p-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              {choice}
            </button>
          ))}
        </div>

        {feedback && (
          <p
            className={`mt-4 text-lg font-medium ${
              feedback === 'correct' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
          </p>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p>Correct answers: {correctCount} / {totalQuestions}</p>
          <p>Wrong answers: {wrongCount} / {maxWrong}</p>
        </div>
      </div>

      {/* Exit Button Below */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          ✖️ Exit Quiz
        </button>
      </div>
    </>
  );
}