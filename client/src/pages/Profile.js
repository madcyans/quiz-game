import { useContext, useEffect, useState } from 'react';
import API from '../api';
import { AuthContext } from '../AuthContext';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/auth/me');
        setProfile(data);
      } catch (e) {
        console.error('Failed to load profile:', e);
        setError(e.response?.data?.error || 'Could not load profile');
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  // Use `user.username` while waiting for the full profile
  if (!profile) 
    return (
      <p className="text-center mt-10">
        Loading profile for <strong>{user?.username}</strong>…
      </p>
    );

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl">{profile.username}'s Profile</h1>
      <p className="mb-4">Score: {profile.score}</p>
      <button
        onClick={logout}
        className="mb-6 text-red-500 hover:underline"
      >
        Log out
      </button>
      <h2 className="text-xl mb-2">History:</h2>
      <ul>
        {[...profile.history].reverse().map((h, i) => (
          <li key={i} className="mb-2">
            {h.correct ? '✅' : '❌'} “{h.question}” – your answer: {h.yourAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
}