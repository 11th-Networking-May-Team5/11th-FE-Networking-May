import React from 'react';
import type { IHourlyWeather } from '../../types/WeatherTime';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { getWeatherIcon, type WeatherType } from '../../utils/getWeatherIcon';
import Chevron from '../../assets/icons/chevron.svg?react';

interface WeatherTimeChartProps {
  weatherHourlyList?: IHourlyWeather[];
}

interface SlideButtonProps {
  $isLeft?: boolean;
  $show?: boolean;
}

const LINE_CHART_HEIGHT = 60;

/**
 * 시간별 날씨 현황 라인 차트
 * @param weatherHourlyList {IHourlyWeather[]}
 * @returns {JSX.Element}
 */
const WeatherTimeChart = ({ weatherHourlyList }: WeatherTimeChartProps) => {
  const chartOverflowContainerRef = React.useRef<HTMLDivElement>(null);

  const [isShowLeftSlideButton, setIsShowLeftSlideButton] =
    React.useState(false);
  const [isShowRightSlideButton, setIsShowRightSlideButton] =
    React.useState(true);

  /**
   *
   */
  const hanldeSlideButtonClick = (position: 'left' | 'rigth') => {
    const overflowContainerElement =
      chartOverflowContainerRef.current as HTMLDivElement;

    if (!overflowContainerElement) {
      return;
    }

    const scrollAmount =
      (position === 'left'
        ? -overflowContainerElement.clientWidth
        : overflowContainerElement.clientWidth) * 0.5;

    overflowContainerElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  /**
   *
   */
  const renderSlideButton = (position: 'left' | 'rigth') => {
    const isLeft = position === 'left';
    const isRight = position === 'rigth';

    return (
      <SlideButton
        $isLeft={isLeft}
        $show={[
          isLeft && isShowLeftSlideButton,
          isRight && isShowRightSlideButton,
        ].some(Boolean)}
        onClick={() => hanldeSlideButtonClick(position)}
      >
        <Chevron />
      </SlideButton>
    );
  };

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

  //
  //
  //
  React.useEffect(() => {
    const overflowContainerElement =
      chartOverflowContainerRef.current as HTMLDivElement;

    if (!overflowContainerElement) {
      return;
    }

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = overflowContainerElement;

      setIsShowLeftSlideButton(scrollLeft > 0);
      setIsShowRightSlideButton(scrollLeft < clientWidth);
    };

    overflowContainerElement.addEventListener('scroll', handleScroll);

    return () => {
      overflowContainerElement.removeEventListener('scroll', handleScroll);
    };
  }, [chartOverflowContainerRef]);

  return (
    <ChartWrapper>
      {renderSlideButton('left')}
      <ChartOverflowContainer ref={chartOverflowContainerRef}>
        <ChartOverflow>
          {renderLineChart()}
          {renderAxis()}
        </ChartOverflow>
      </ChartOverflowContainer>
      {renderSlideButton('rigth')}
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  position: relative;
  padding: 0 8px;
`;

const ChartOverflowContainer = styled.div`
  overflow: scroll;
`;

const ChartOverflow = styled.div`
  width: 200%;
`;

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

const SlideButton = styled.button<SlideButtonProps>`
  position: absolute;
  top: 40%;
  ${({ $isLeft }) => ($isLeft ? 'left' : 'right')} : -20px;
  transform: ${({ $isLeft }) => ($isLeft ? 'rotate(180deg)' : 'rotate(0deg)')};
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

export default WeatherTimeChart;
