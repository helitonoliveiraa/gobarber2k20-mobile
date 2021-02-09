import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333',
});

export default api;

// 'http://localhost:3333' ||
// 'http://192.168.1.6:3333'
// 'http://10.0.2.2:3333'
