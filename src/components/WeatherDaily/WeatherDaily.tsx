import React from 'react';
import WeatherBox from '../common/WeatherBox';
import useWeatherLocation from '../../hooks/useWeatherLocation';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../common/Skeleton';
import { getWeatherDaily } from '../../apis/Weather/weatherDaily';
import styled from 'styled-components';
import { getWeatherIcon } from '../../utils/getWeatherIcon';

const WeatherDaily = () => {
  const { location } = useWeatherLocation();

  const { data: dailyWeather, isPending } = useQuery({
    queryKey: ['weather', 'daily', location],
    queryFn: () => getWeatherDaily(location),
    enabled: !!location,
  });

  const date = new Date();

  const title = `${date.getMonth() + 1}월 ${date.getDate()}일 날씨 현황`;

  return (
    <WeatherBox title={title}>
      <Skeleton isLoading={isPending} height="120px" style={{ margin: '12px' }}>
        <WeatherDailyContainer></WeatherDailyContainer>
      </Skeleton>
    </WeatherBox>
  );
};

const WeatherDailyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

export default WeatherDaily;
