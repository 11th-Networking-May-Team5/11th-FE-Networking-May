import * as day from '../assets/icons/weather/day';
import * as night from '../assets/icons/weather/night';
import { isDayTime } from './isDayTime';

export type WeatherType =
  | 'Clear'
  | 'Rain'
  | 'Drizzle'
  | 'Snow'
  | 'Thunderstorm'
  | 'Clouds'
  | 'Atmosphere';

const DAY_WEATHER_ICON_MAP: Record<WeatherType, string> = {
  Clear: day.sun,
  Rain: day.rain,
  Drizzle: day.rain,
  Snow: day.snow,
  Thunderstorm: day.storm,
  Clouds: day.wind,
  Atmosphere: day.clouds,
} as const;

const NIGHT_WEATHER_ICON_MAP: Record<WeatherType, string> = {
  Clear: night.sun,
  Rain: night.rain,
  Drizzle: night.rain,
  Snow: night.snow,
  Thunderstorm: night.storm,
  Clouds: night.wind,
  Atmosphere: night.clouds,
} as const;

/**
 * - 날씨 아이콘을 반환
 * - 시간을 기준으로 낮과 밤을 구분
 * @param weather {WeatherType}
 * @param date {Date}
 * @returns 날씨 아이콘
 */
export const getWeatherIcon = (weather: WeatherType, date: Date) => {
  const isDay = isDayTime(date);

  if (isDay) {
    return DAY_WEATHER_ICON_MAP[weather as keyof typeof DAY_WEATHER_ICON_MAP];
  }

  return NIGHT_WEATHER_ICON_MAP[weather as keyof typeof NIGHT_WEATHER_ICON_MAP];
};
