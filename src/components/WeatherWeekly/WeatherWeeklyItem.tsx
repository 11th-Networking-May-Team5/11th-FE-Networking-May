import styled from 'styled-components';
import { getWeatherIcon, type WeatherType } from '../../utils/getWeatherIcon';
import type { IWeeklyWeatherItem } from '../../types/WeatherWeekly';

interface Props {
  item: IWeeklyWeatherItem;
}

const formatDateInfo = (dateStr: string) => {
  const date = new Date(dateStr);
  return {
    isToday: new Date().toDateString() === date.toDateString(),
    mmdd: `${date.getMonth() + 1}.${date.getDate()}`,
    dayOfWeek: date.toLocaleDateString('ko-KR', { weekday: 'short' }),
  };
};

const WeatherWeeklyItem = ({ item }: Props) => {
  const { isToday, mmdd, dayOfWeek } = formatDateInfo(item.date);
  const slots = [
    {
      label: '오전',
      data: item.morning,
      isAfternoon: false,
      hour: 6,
    },
    {
      label: '오후',
      data: item.afternoon,
      isAfternoon: true,
      hour: 18,
    },
  ];

  return (
    <Item>
      <IconGroup>
        {slots.map(({ data, hour, label, isAfternoon }, index) => {
          const dateWithTime = new Date(item.date);
          dateWithTime.setHours(hour);

          return (
            <IconBox key={index}>
              <WeatherIcon
                src={getWeatherIcon(data.weather as WeatherType, dateWithTime)}
              />
              <HumidityText>{data.humidity}%</HumidityText>
              <LabelText>{label}</LabelText>
              <TempText $isAfternoon={isAfternoon}>
                {data.temp.toFixed(1)}°
              </TempText>
            </IconBox>
          );
        })}
      </IconGroup>

      <BottomDate>
        {isToday ? '오늘' : dayOfWeek}
        <br />
        {mmdd}
      </BottomDate>
    </Item>
  );
};

export default WeatherWeeklyItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const HumidityText = styled.div`
  font-size: 20px;
  color: rgba(204, 232, 255, 1);
  font-weight: 700;
  margin-top: 12px;
`;

const LabelText = styled.div`
  font-size: 16px;
  color: #292e2e;
  font-weight: 700;
  margin-top: 12px;
`;

const TempText = styled.div<{ $isAfternoon: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $isAfternoon }) =>
    $isAfternoon ? 'rgba(255, 50, 50, 1)' : 'rgba(50, 161, 255, 1)'};
  margin-top: 12px;
`;

const BottomDate = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;
