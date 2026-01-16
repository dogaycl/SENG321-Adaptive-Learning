import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI'nin çalıştığı port
});

export default api;