import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(new Error('Network Error'));
});
