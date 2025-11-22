import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// Interceptor simples: Apenas pega o ID do localStorage e envia no cabeçalho
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('@dailydiet:userid');
  
  if (userId) {
    config.headers['user-id'] = userId;
  }
  
  return config;
});

export default api;