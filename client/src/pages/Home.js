import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext }       from '../AuthContext';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();            // clears user/token in context
    navigate('/login');  // sends you back to login screen
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      <div className="space-y-4">
        <Link
          to="/quiz"
          className="block w-48 text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ▶️ Play Game
        </Link>
        <Link
          to="/leaderboard"
          className="block w-48 text-center py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🏆 Leaderboard
        </Link>
        <Link
          to="/rules"
          className="block w-48 text-center py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          📖 Game Rules
        </Link>
        <button
          onClick={handleLogout}
          className="block w-48 text-center py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}