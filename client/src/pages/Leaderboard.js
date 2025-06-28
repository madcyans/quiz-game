import React, { useEffect, useState } from 'react';
import { Link }                        from 'react-router-dom';
import API                             from '../api';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [error, setError]       = useState('');

  useEffect(() => {
    API.get('/users/leaderboard')
      .then(res => setTopUsers(res.data))
      .catch(() => setError('Could not load leaderboard'));
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h1>
      <ol className="list-decimal list-inside space-y-2">
        {topUsers.map((u, idx) => (
          <li key={u._id} className="flex justify-between">
            <span>{u.username}</span>
            <span>{u.highscore}</span>
          </li>
        ))}
      </ol>

      {/* button row */}
      <div className="mt-6 flex justify-center space-x-4">
        <Link
          to="/quiz"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ▶️ Play Again
        </Link>

        <Link
          to="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          ↩️ Back to Main Page
        </Link>
      </div>
    </div>
  );
}