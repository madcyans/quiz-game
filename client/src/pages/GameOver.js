import { useLocation, Link } from 'react-router-dom';

export default function GameOver() {
  const { state } = useLocation();
  const { reason, highscore, finalScore } = state;

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl">Game Over</h1>
      {reason === 'done' && finalScore != null && (
        <p className="mt-4">You answered <strong>{finalScore}</strong> correctly!</p>
      )}
      <p className="mt-2">Your high score is: <strong>{highscore}</strong></p>
      <Link to="/leaderboard" className="mt-6 inline-block text-blue-600">
        View Leaderboard
      </Link>
    </div>
  );
}