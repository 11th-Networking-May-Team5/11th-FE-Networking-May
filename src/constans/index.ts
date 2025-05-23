import type { WeatherType } from '../types/common';

export const SIDEBAR_WIDTH = '248px';

export const WEATHER_TO_KOREAN: Record<WeatherType, string> = {
  Clear: '맑음',
  Rain: '비',
  Drizzle: '이슬비',
  Snow: '눈',
  Thunderstorm: '천둥번개',
  Clouds: '구름',
  Atmosphere: '대기',
} as const;
