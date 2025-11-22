import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// Função para garantir que o usuário existe (pois o banco é em memória)
api.interceptors.request.use(async (config) => {
  let userId = localStorage.getItem('@dailydiet:userid');

  if (!userId) {
    const response = await axios.post('http://localhost:3333/users', {
      name: "User Teste",
      email: "teste@email.com"
    });
    userId = response.data.id;
    localStorage.setItem('@dailydiet:userid', userId);
  }

  config.headers['user-id'] = userId;
  return config;
});

export default api;