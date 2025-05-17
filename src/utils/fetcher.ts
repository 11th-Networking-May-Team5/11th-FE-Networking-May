import { axiosInstance } from '../apis/axiosInstance';

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axiosInstance.get<T>(url);

  return res.data;
};
