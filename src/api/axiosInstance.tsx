import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:5191/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// Optional: Add request/response interceptors for error handling, authentication, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle API errors (e.g., display error messages)
    return Promise.reject(error);
  }
);

export default axiosInstance;