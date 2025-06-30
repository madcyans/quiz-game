import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://<your-render-service>.onrender.com'
});
// …interceptors as before
export default API;