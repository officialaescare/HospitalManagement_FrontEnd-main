// Axios instance setup
import axios from 'axios';

// Create an axios instance for local API endpoints
export const api = axios.create({ 
  baseURL: 'https://localhost:7162/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create an axios instance for external API endpoints
export const externalApi = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});