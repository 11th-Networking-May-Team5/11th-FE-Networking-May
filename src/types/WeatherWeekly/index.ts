export interface IDailyWeather {
  temp: number;
  humidity: number;
  weather: string;
}

export interface IWeeklyWeatherItem {
  date: string;
  morning: IDailyWeather;
  afternoon: IDailyWeather;
}

export interface IWeatherWeeklyResponse {
  weekly: IWeeklyWeatherItem[];
}
