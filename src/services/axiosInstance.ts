// src/services/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5105/api/',// 'https://api-prisma-prime-invest.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Configuração do timeout (10 segundos)
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
