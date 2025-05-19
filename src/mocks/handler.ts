import { http } from 'msw';
import { weatherHourlyResolver } from './weatherHourlyResolver';

export const handlers = [
  http.get(
    import.meta.env.VITE_API_URL + '/weather/hourly',
    weatherHourlyResolver,
  ),
];
