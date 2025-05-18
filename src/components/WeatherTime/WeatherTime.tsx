import React from 'react';
import WeatherBox from '../common/WeatherBox';
import useWeatherLocation from '../../hooks/useWeatherLocation';
import { useQuery } from '@tanstack/react-query';
import { getWeaherHourly } from '../../apis/Weather/WeatherHourly';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const WeatherTime = () => {
  const { location } = useWeatherLocation();

  const { data } = useQuery({
    queryKey: ['weather', 'hourly', location],
    queryFn: () => getWeaherHourly(location),
    enabled: !!location,
  });

  const weatherHourlyData = data?.hourly.slice(12);

  return (
    <WeatherBox title="시간별 현황">
      <WeatherTimeWrapper>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart
            data={weatherHourlyData?.map(hourWeahter => {
              return {
                name: hourWeahter.time,
                pv: Math.floor(hourWeahter.temp),
              };
            })}
          >
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#D6D6D6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </WeatherTimeWrapper>
    </WeatherBox>
  );
};

const WeatherTimeWrapper = styled.div`
  padding: 12px 24px;
`;

export default WeatherTime;
