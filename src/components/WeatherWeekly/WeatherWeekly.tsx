import React from 'react';
import WeatherBox from '../common/WeatherBox';
import useWeatherLocation from '../../hooks/useWeatherLocation';
import { useQuery } from '@tanstack/react-query';
import { getWeatherWeekly } from '../../apis/Weather/getWeatherWeekly';
import Skeleton from '../common/Skeleton';
import WeatherWeeklyChart from './WeatherWeeklyChart';

/**
 * 주간 예보
 */
const WeatherWeekly = () => {
  const { location } = useWeatherLocation();

  const { data: weatherWeeklyList, isPending } = useQuery({
    queryKey: ['weather', 'weekly', location],
    queryFn: () => getWeatherWeekly(location),
    enabled: !!location,
  });

  return (
    <WeatherBox title="주간 예보">
      <Skeleton isLoading={isPending} height="160px" style={{ margin: '12px' }}>
        {weatherWeeklyList && (
          <WeatherWeeklyChart weatherWeeklyList={weatherWeeklyList} />
        )}
      </Skeleton>
    </WeatherBox>
  );
};

export default WeatherWeekly;
