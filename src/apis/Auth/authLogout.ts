import { axiosInstance } from '../axiosInstance';

export const getAuthLogout = async () => {
  try {
    const res = await axiosInstance.post('/auth/logout');

    return res.data;
  } catch (error) {
    return error;
  }
};
