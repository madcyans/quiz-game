import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://quiz-game-d89x.onrender.com/api', // note the /api here
  withCredentials: true // optional, in case you're using cookies/tokens
});

export default API;