import { axiosInstance } from '../axiosInstance';

export const postAuthLogout = async () => {
  try {
    const res = await axiosInstance.post('/auth/logout');

    return res.data;
  } catch (error) {
    return error;
  }
};
