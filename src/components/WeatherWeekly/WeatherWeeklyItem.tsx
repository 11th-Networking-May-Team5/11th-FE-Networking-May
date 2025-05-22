import React from 'react';
import styled from 'styled-components';
import { getWeatherIcon, type WeatherType } from '../../utils/getWeatherIcon';
import type { IWeeklyWeatherItem } from '../../types/WeatherWeekly';

interface Props {
  item: IWeeklyWeatherItem;
}

const WeatherWeeklyItem = ({ item }: Props) => {
  const date = new Date(item.date);
  const dayOfWeek = date.toLocaleDateString('ko-KR', {
    weekday: 'short',
  });
  const mmdd = `${date.getMonth() + 1}.${date.getDate()}`;

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
        {slots.map((slot, i) => {
          const dateWithTime = new Date(item.date);
          dateWithTime.setHours(slot.hour);

          return (
            <IconBox key={i}>
              <WeatherIcon
                src={getWeatherIcon(
                  slot.data.weather as WeatherType,
                  dateWithTime,
                )}
              />
              <HumidityText>{slot.data.humidity}%</HumidityText>
              <LabelText>{slot.label}</LabelText>
              <TempText $isAfternoon={slot.isAfternoon}>
                {slot.data.temp.toFixed(1)}°
              </TempText>
            </IconBox>
          );
        })}
      </IconGroup>

      <BottomDate>
        {dayOfWeek === '오늘' ? '오늘' : dayOfWeek}
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
