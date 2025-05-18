import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`/weather/hourly`, () => {
    return HttpResponse.json({
      code: 'WEATHER-002',
      message: '시간별 날씨 조회 성공',
      data: {
        hourly: [
          {
            time: '2024-05-03T13:00:00',
            weather: 'Clouds',
            temp: 18.4,
          },
          {
            time: '2024-05-03T14:00:00',
            weather: 'Clear',
            temp: 19.0,
          },
        ],
      },
    });
  }),
];
