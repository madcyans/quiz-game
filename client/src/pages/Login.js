import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate          = useNavigate();
  const location          = useLocation();

  // If we came from /signup, pre-fill the username
  const fromSignUp = location.state?.username || '';

  useState(() => {
    if (fromSignUp) setForm(f => ({ ...f, username: fromSignUp }));
  }, [fromSignUp]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      login(data);                  // store token & user in context + localStorage
      navigate('/', { replace: true });
    } catch (e) {
      const msg = e.response?.data?.error || 'Login failed';
      console.error('Login error:', msg);
      setError(msg);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value.trim() })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}