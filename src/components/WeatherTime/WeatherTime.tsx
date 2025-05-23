import WeatherBox from '../common/WeatherBox';
import useWeatherLocation from '../../hooks/useWeatherLocation';
import { useQuery } from '@tanstack/react-query';
import { getWeatherHourly } from '../../apis/Weather/WeatherHourly';
import Skeleton from '../common/Skeleton';
import WeatherTimeChart from './WeatherTimeChart';

/**
 * 시간별 날씨 현황 라인 차트
 */
const WeatherTime = () => {
  const { location } = useWeatherLocation();

  const { data, isPending } = useQuery({
    queryKey: ['weather', 'hourly', location],
    queryFn: () => getWeatherHourly(location),
    enabled: !!location,
  });

  const weatherHourlyList = data?.hourly;

  return (
    <WeatherBox title="시간별 현황">
      <Skeleton isLoading={isPending} height="120px" style={{ margin: '12px' }}>
        <WeatherTimeChart weatherHourlyList={weatherHourlyList} />
      </Skeleton>
    </WeatherBox>
  );
};

export default WeatherTime;
