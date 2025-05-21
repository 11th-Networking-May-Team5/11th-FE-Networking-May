export interface IWeeklyWeatherItem {
  date: string;
  morning: {
    temp: number;
    humidity: number;
    weather: string;
  };
  afternoon: {
    temp: number;
    humidity: number;
    weather: string;
  };
}

export interface IWeatherWeeklyResponse {
  weekly: IWeeklyWeatherItem[];
}
