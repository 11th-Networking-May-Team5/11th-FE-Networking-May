import { http } from 'msw';
import { weatherHourlyResolver } from './weatherHourlyResolver';
import { authCheckResolver } from './authCheckResolver';

export const handlers = [
  http.get(
    import.meta.env.VITE_API_URL + '/weather/hourly',
    weatherHourlyResolver,
  ),

  http.get(import.meta.env.VITE_API_URL + '/auth/check', authCheckResolver),
];
