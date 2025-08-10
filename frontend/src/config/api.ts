// API Configuration for development and production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://json-prompt-backend.onrender.com'  // Your actual backend URL
  : 'http://localhost:8001';

export default API_BASE_URL;
