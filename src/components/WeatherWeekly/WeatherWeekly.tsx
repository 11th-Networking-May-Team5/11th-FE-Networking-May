import WeatherBox from '../common/WeatherBox';
import { useQuery } from '@tanstack/react-query';
import { getWeatherWeekly } from '../../apis/Weather/getWeatherWeekly';
import Skeleton from '../common/Skeleton';
import WeatherWeeklyChart from './WeatherWeeklyChart';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useWeatherLocations from '../../hooks/useWeatherLocations';
import type { ILocationResponse } from '../../types/Locations';

/**
 * 주간 예보
 */
const WeatherWeekly = () => {
  const { currentLocation } = useCurrentLocation();

  const { selectedLocation } = useWeatherLocations();

  const location = selectedLocation ?? currentLocation;

  const { data, isPending } = useQuery({
    queryKey: ['weather', 'weekly', location],
    queryFn: () => getWeatherWeekly(location as ILocationResponse),
    enabled: !!location,
  });

  const weatherWeeklyList = data?.weekly;

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
