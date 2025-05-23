import WeatherBox from '../common/WeatherBox';
import useWeatherLocations from '../../hooks/useWeatherLocations';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../common/Skeleton';
import { getWeatherDaily } from '../../apis/Weather/weatherDaily';
import styled from 'styled-components';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import type { IWeatherDailyResponse } from '../../types/WeatherDaily';
import { isDayTime } from '../../utils/isDayTime';
import { WEATHER_TO_KOREAN } from '../../constans';
import type { WeatherType } from '../../types/common';
import WeatherDailyStatusBox from './WeatherDailyStatusBox';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const WeatherDaily = () => {
  const { selectedLocation } = useWeatherLocations();

  const { currentLocation } = useCurrentLocation();

  const location = selectedLocation ?? currentLocation;

  const { data: dailyWeather, isPending } = useQuery<IWeatherDailyResponse>({
    queryKey: ['weather', 'daily', location],
    queryFn: () => getWeatherDaily(location),
    enabled: !!location,
  });

  const date = new Date();

  const title = `${date.getMonth() + 1}월 ${date.getDate()}일 날씨 현황`;

  /**
   *
   */
  const renderIconAndTemp = () => {
    if (!dailyWeather) {
      return null;
    }

    const { weather, temp } = dailyWeather;

    return (
      <DailyMain>
        <img src={getWeatherIcon(weather as WeatherType, date)} alt={weather} />
        <h1>{temp.toFixed(1)}°</h1>
      </DailyMain>
    );
  };

  /**
   *
   */
  const renderWeatherInfo = () => {
    if (!dailyWeather) {
      return null;
    }

    const { weather, feelsLike, humidity, windSpeed, windDeg } = dailyWeather;

    const lowerInfo = [
      {
        title: '체감',
        value: `${feelsLike.toFixed(1)}°`,
      },
      {
        title: '습도',
        value: `${humidity}%`,
      },
      {
        title: windDeg,
        value: `${windSpeed.toFixed(1)}m/s`,
      },
    ];

    return (
      <WeatherInfo>
        <WeatherUpperInfo>
          {isDayTime(date) ? '주간' : '야간'} /{' '}
          {WEATHER_TO_KOREAN[weather as keyof typeof WEATHER_TO_KOREAN]}
        </WeatherUpperInfo>
        <WeatherLowerInfo>
          {lowerInfo.map((info, index) => (
            <span key={index}>
              {info.title} <BlackColor>{info.value}</BlackColor>
              {index !== lowerInfo.length - 1 && <Dot />}
            </span>
          ))}
        </WeatherLowerInfo>
      </WeatherInfo>
    );
  };

  /**
   *
   */
  const renderWeatherStatus = () => {
    if (!dailyWeather) {
      return null;
    }

    const { pm10, pm2_5, uvi, sunrise } = dailyWeather;

    const sunriseTime = new Date(sunrise).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const weatherStatus = [
      {
        title: '미세먼지',
        value: pm10,
      },
      {
        title: '초미세먼지',
        value: pm2_5,
      },
      {
        title: '자외선 지수',
        value: uvi,
      },
      {
        title: '일출',
        value: sunriseTime,
      },
    ];

    return (
      <WeatherStatusContainer>
        {weatherStatus.map(({ title, value }) => (
          <WeatherDailyStatusBox title={title} value={value} />
        ))}
      </WeatherStatusContainer>
    );
  };

  return (
    <WeatherBox title={title}>
      <Skeleton isLoading={isPending} height="120px" style={{ margin: '12px' }}>
        <WeatherDailyContainer>
          {renderIconAndTemp()}
          {renderWeatherInfo()}
          {renderWeatherStatus()}
        </WeatherDailyContainer>
      </Skeleton>
    </WeatherBox>
  );
};

const WeatherDailyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const DailyMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  > img {
    width: 160px;
    height: 160px;
  }

  > h1 {
    color: #292e2e;
    font-size: 80px;
    font-weight: 700;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const WeatherUpperInfo = styled.span`
  color: #292e2e;
  font-size: 20px;
  font-weight: 600;
`;

const WeatherLowerInfo = styled.span`
  color: #a4a4a4;
  font-size: 16px;
  font-weight: 500;
`;

const BlackColor = styled.span`
  color: #292e2e;
`;

const Dot = styled.span`
  &:before {
    content: '●';
    color: #a4a4a4;
    font-size: 8px;
    line-height: 16px;
    margin: 0 8px;
    vertical-align: middle;
  }
`;

const WeatherStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 8px;
`;

export default WeatherDaily;
