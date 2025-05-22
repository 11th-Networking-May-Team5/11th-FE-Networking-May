import type { ILocation } from '../../types/Locations';
import { axiosInstance } from '../axiosInstance';

export const getWeatherHourly = async (location?: ILocation) => {
  const res = await axiosInstance.get('/weather/hourly', {
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  return res.data.data;
};
