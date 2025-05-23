export interface IPostResponse {
  success: boolean;
  message: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export type WeatherType =
  | 'Clear'
  | 'Rain'
  | 'Drizzle'
  | 'Snow'
  | 'Thunderstorm'
  | 'Clouds'
  | 'Atmosphere';
