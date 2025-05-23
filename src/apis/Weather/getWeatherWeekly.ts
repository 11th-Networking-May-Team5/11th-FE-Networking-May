import type { ILocationResponse } from '../../types/Locations';
import { axiosInstance } from '../axiosInstance';

export const getWeatherWeekly = async (location?: ILocationResponse) => {
  const res = await axiosInstance.get('/weather/weekly', {
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  return res.data.data;
};
