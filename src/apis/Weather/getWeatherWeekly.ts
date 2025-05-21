import type { ILocation } from '../../types/common';
import type { IWeeklyWeatherItem } from '../../types/WeatherWeekly';
import { axiosInstance } from '../axiosInstance';

export const getWeatherWeekly = async (
  location?: ILocation,
): Promise<IWeeklyWeatherItem[]> => {
  const res = await axiosInstance.get('/weather/weekly', {
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  return res.data.weekly;
};
