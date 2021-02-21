import axios from 'axios';
import {API_URL} from '@env';

const api = axios.create({
  baseURL: API_URL,
});

export default api;

// 'http://localhost:3333' ||
// 'http://192.168.1.6:3333'
// 'http://10.0.2.2:3333'
