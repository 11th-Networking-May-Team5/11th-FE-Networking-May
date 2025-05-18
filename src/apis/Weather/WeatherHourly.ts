import type { ILocation } from '../../types/common';
import type { IWeatherHourlyResponse } from '../../types/WeatherTime';
import { axiosInstance } from '../axiosInstance';

export const getWeaherHourly = async (
  location?: ILocation,
): Promise<IWeatherHourlyResponse> => {
  const res = await axiosInstance.get('/weather/hourly', {
    params: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  return res.data;
};
