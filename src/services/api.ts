import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default api;