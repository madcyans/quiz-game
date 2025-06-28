import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext }       from '../AuthContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();            // clear user from context
    navigate('/login');  // send them to login screen
  };

  return (
    <nav className="bg-white shadow px-4 py-2 flex justify-between">
      <div className="space-x-4">
        <Link to="/"            className="font-bold">Home</Link>
        <Link to="/quiz">Play</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <span className="mr-4">{user.username}</span>
        <button
          onClick={handleLogout}
          className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}