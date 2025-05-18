import React from 'react';
import type { IHourlyWeather } from '../../types/WeatherTime';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { getWeatherIcon, type WeatherType } from '../../utils/getWeatherIcon';

interface WeatherTimeChartProps {
  weatherHourlyList?: IHourlyWeather[];
}

const LINE_CHART_HEIGHT = 60;

/**
 * 시간별 날씨 현황 라인 차트
 * @param weatherHourlyList {IHourlyWeather[]}
 * @returns {JSX.Element}
 */
const WeatherTimeChart = ({ weatherHourlyList }: WeatherTimeChartProps) => {
  /**
   *
   */
  const renderLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height={LINE_CHART_HEIGHT}>
        <LineChart
          data={weatherHourlyList?.map(hourWeahter => {
            return {
              pv: Math.floor(hourWeahter.temp),
            };
          })}
          margin={{
            top: 12,
            right: 24,
            left: 24,
            bottom: -(LINE_CHART_HEIGHT - 12),
          }}
        >
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="pv"
            stroke="#D6D6D6"
            strokeWidth={2}
            dot={{ fill: '#D6D6D6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  /**
   *
   */
  const renderAxis = () => {
    return (
      <AxisWrapper>
        {weatherHourlyList?.map(hourWeahter => {
          const { time, temp, weather } = hourWeahter;

          return (
            <AxisTick key={time}>
              <TickImage
                src={getWeatherIcon(weather as WeatherType, new Date(time))}
                alt={weather}
              />
              <TickTimeText>{`${time.slice(11, 13)}시`}</TickTimeText>
              <TickWeatherText>{`${Math.floor(temp)}º`}</TickWeatherText>
            </AxisTick>
          );
        })}
      </AxisWrapper>
    );
  };
  return (
    <>
      {renderLineChart()}
      {renderAxis()}
    </>
  );
};

const AxisWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  margin-bottom: 12px;
`;

const AxisTick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TickImage = styled.img`
  width: 40px;
  height: 40px;
`;

const TickTimeText = styled.span`
  font-size: 12px;
  color: #a4a4a4;
`;

const TickWeatherText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #292e2e;
`;

export default WeatherTimeChart;
