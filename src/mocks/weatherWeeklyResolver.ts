import { HttpResponse } from 'msw';

export const weatherWeeklyResolver = () => {
  return HttpResponse.json({
    code: 'WEA-003',
    message: '5일 주간 예보 조회 성공',
    data: {
      weekly: [
        {
          date: '2025-05-21',
          morning: { temp: 15.0, humidity: 70, weather: 'Clear' },
          afternoon: { temp: 22.0, humidity: 50, weather: 'Clouds' },
        },
        {
          date: '2025-05-22',
          morning: { temp: 14.5, humidity: 60, weather: 'Rain' },
          afternoon: { temp: 20.3, humidity: 55, weather: 'Rain' },
        },
        {
          date: '2025-05-23',
          morning: { temp: 13.8, humidity: 65, weather: 'Clouds' },
          afternoon: { temp: 21.7, humidity: 58, weather: 'Clear' },
        },
        {
          date: '2025-05-24',
          morning: { temp: 16.1, humidity: 50, weather: 'Clear' },
          afternoon: { temp: 23.0, humidity: 45, weather: 'Clear' },
        },
        {
          date: '2025-05-25',
          morning: { temp: 17.2, humidity: 52, weather: 'Clouds' },
          afternoon: { temp: 24.1, humidity: 49, weather: 'Clouds' },
        },
      ],
    },
  });
};
