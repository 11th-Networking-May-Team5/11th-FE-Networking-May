import React from 'react';
import WeatherBox from '../common/WeatherBox';
import useWeatherLocation from '../../hooks/useWeatherLocation';
import { useQuery } from '@tanstack/react-query';
import { getWeaherHourly } from '../../apis/Weather/WeatherHourly';

const WeatherTime = () => {
  const { location } = useWeatherLocation();

  const { data, isPending } = useQuery({
    queryKey: ['weather', 'hourly', location],
    queryFn: () => getWeaherHourly(location),
    enabled: !!location,
  });

  if (!isPending) {
    console.log('data', data);
  }

  return (
    <WeatherBox title="시간별 현황">
      <div>ㅎ앟얗ㅇ</div>
    </WeatherBox>
  );
};

export default WeatherTime;
