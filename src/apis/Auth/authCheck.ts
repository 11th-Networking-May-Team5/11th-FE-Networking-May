import { axiosInstance } from '../axiosInstance';

export const getAuthCheck = async () => {
  const res = await axiosInstance.get('/auth/check');

  return res.data.data;
};
