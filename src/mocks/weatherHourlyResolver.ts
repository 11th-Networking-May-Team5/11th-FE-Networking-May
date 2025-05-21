import { HttpResponse } from 'msw';

export const weatherHourlyResolver = () => {
  return HttpResponse.json({
    code: 'WEATHER-002',
    message: '시간별 날씨 조회 성공',
    data: {
      hourly: [
        { time: '2024-05-03T00:00:00', weather: 'Clear', temp: 14.2 },
        { time: '2024-05-03T01:00:00', weather: 'Clear', temp: 13.8 },
        { time: '2024-05-03T02:00:00', weather: 'Clouds', temp: 13.0 },
        { time: '2024-05-03T03:00:00', weather: 'Clouds', temp: 12.5 },
        { time: '2024-05-03T04:00:00', weather: 'Rain', temp: 12.0 },
        { time: '2024-05-03T05:00:00', weather: 'Rain', temp: 11.8 },
        { time: '2024-05-03T06:00:00', weather: 'Clouds', temp: 12.2 },
        { time: '2024-05-03T07:00:00', weather: 'Clear', temp: 13.5 },
        { time: '2024-05-03T08:00:00', weather: 'Clear', temp: 15.0 },
        { time: '2024-05-03T09:00:00', weather: 'Clear', temp: 16.8 },
        { time: '2024-05-03T10:00:00', weather: 'Clouds', temp: 17.5 },
        { time: '2024-05-03T11:00:00', weather: 'Clouds', temp: 18.2 },
        { time: '2024-05-03T12:00:00', weather: 'Rain', temp: 17.0 },
        { time: '2024-05-03T13:00:00', weather: 'Clouds', temp: 18.4 },
        { time: '2024-05-03T14:00:00', weather: 'Clear', temp: 19.0 },
        { time: '2024-05-03T15:00:00', weather: 'Rain', temp: 17.5 },
        { time: '2024-05-03T16:00:00', weather: 'Clear', temp: 20.0 },
        { time: '2024-05-03T17:00:00', weather: 'Clouds', temp: 18.8 },
        { time: '2024-05-03T18:00:00', weather: 'Clouds', temp: 17.0 },
        { time: '2024-05-03T19:00:00', weather: 'Rain', temp: 16.2 },
        { time: '2024-05-03T20:00:00', weather: 'Clear', temp: 15.0 },
        { time: '2024-05-03T21:00:00', weather: 'Clear', temp: 14.5 },
        { time: '2024-05-03T22:00:00', weather: 'Clouds', temp: 13.8 },
        { time: '2024-05-03T23:00:00', weather: 'Rain', temp: 13.0 },
      ],
    },
  });
};
