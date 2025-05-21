export interface IHourlyWeather {
  time: string;
  weather: string;
  temp: number;
}

export interface IWeatherHourlyResponse {
  hourly: IHourlyWeather[];
}
