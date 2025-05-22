import type { ILocation } from '../../types/common';
import { axiosInstance } from '../axiosInstance';

export const getWeatherDaily = async (location?: ILocation) => {
  const res = await axiosInstance.get('/weather/daily', {
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  return res.data.data;
};
