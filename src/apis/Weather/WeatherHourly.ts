import type { IWeatherHourlyResponse } from '../../types/WeatherTime';
import { axiosInstance } from '../axiosInstance';

export const getWeaherHourly = async () => {
  const res = await axiosInstance.get('weather/hourly');

  return res.data;
};
