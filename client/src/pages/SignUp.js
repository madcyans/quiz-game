import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../AuthContext';



export default function SignUp() {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username:'', password:'' });
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    try {
        await API.post('/auth/register', form);
        // optional delay to let DB settle (rare, but helpful for local dev)
        await new Promise(r => setTimeout(r, 300)); 
        const { data } = await API.post('/auth/login', form);
        login(data);
        navigate('/quiz', { replace: true }); 
        } catch (e) {
          console.error('❌ Something failed:', e.response?.data?.error || e.message);
          setError(e.response?.data?.error || 'Registration or login failed');
        }
  };
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {['username','password'].map(f=>(
        <input
          key={f}
          type={f==='password'?'password':'text'}
          placeholder={f}
          value={form[f]}
          onChange={e=>setForm({...form, [f]:e.target.value})}
          className="block w-full p-2 mb-3 border rounded"
        />
      ))}
      <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}