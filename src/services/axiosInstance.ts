// src/services/axiosInstance.ts
import axios from 'axios';
import nookies from 'nookies';
import { IApiResponseError } from './interfaces';

const axiosInstance = axios.create({
  baseURL: 'https://prisma-prime-invest-ep.azurewebsites.net/api/', // 'https://prisma-prime-invest-ep.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { authToken } = nookies.get(null);
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Erro ao adicionar o token ao cabeçalho:", error);
    return Promise.reject<IApiResponseError>(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.status === 401) {
      return Promise.reject(error.response);
    }
    return Promise.resolve(error.response);
  }
);

export default axiosInstance;
