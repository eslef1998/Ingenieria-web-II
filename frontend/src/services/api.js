import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Asegúrate de que sea 4000
});

export default API;