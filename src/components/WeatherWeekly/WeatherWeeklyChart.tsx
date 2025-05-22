import styled from 'styled-components';
import { getWeatherIcon, type WeatherType } from '../../utils/getWeatherIcon';

interface WeatherWeeklyListProps {
  weatherWeeklyList?: IWeeklyWeatherItem[];
}

interface IWeeklyWeatherItem {
  date: string;
  morning: { temp: number; humidity: number; weather: string };
  afternoon: { temp: number; humidity: number; weather: string };
}

const WeatherWeeklyChart = ({ weatherWeeklyList }: WeatherWeeklyListProps) => {
  if (!weatherWeeklyList || weatherWeeklyList.length === 0) return null;

  return (
    <List>
      {weatherWeeklyList
        .filter(
          (item): item is IWeeklyWeatherItem =>
            !!item?.morning && !!item?.afternoon,
        )
        .map((dayItem, index) => {
          const date = new Date(dayItem.date);
          const dayOfWeek = date.toLocaleDateString('ko-KR', {
            weekday: 'short',
          });
          const mmdd = `${date.getMonth() + 1}.${date.getDate()}`;

          return (
            <Item key={index}>
              <IconGroup>
                <IconBox>
                  <WeatherIcon
                    src={getWeatherIcon(
                      dayItem.morning.weather as WeatherType,
                      date,
                    )}
                  />
                  <HumidityText>{dayItem.morning.humidity}%</HumidityText>
                  <LabelText>오전</LabelText>
                  <TempText $isHigh={false}>
                    {dayItem.morning.temp.toFixed(1)}°
                  </TempText>
                </IconBox>

                <IconBox>
                  <WeatherIcon
                    src={getWeatherIcon(
                      dayItem.afternoon.weather as WeatherType,
                      date,
                    )}
                  />
                  <HumidityText>{dayItem.afternoon.humidity}%</HumidityText>
                  <LabelText>오후</LabelText>
                  <TempText $isHigh={true}>
                    {dayItem.afternoon.temp.toFixed(1)}°
                  </TempText>
                </IconBox>
              </IconGroup>

              <BottomDate>
                {index === 0 ? '오늘' : dayOfWeek}
                <br />
                {mmdd}
              </BottomDate>
            </Item>
          );
        })}
    </List>
  );
};

export default WeatherWeeklyChart;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 24px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 20px;
  margin: 8px 0;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const HumidityText = styled.div`
  font-size: 14px;
  color: #a4cfff;
  font-weight: 600;
  margin-top: 4px;
`;

const LabelText = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-top: 2px;
`;

const TempText = styled.div<{ $isHigh: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $isHigh }) => ($isHigh ? '#f44336' : '#2196f3')};
  margin-top: 2px;
`;

const BottomDate = styled.div`
  margin-top: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #111;
`;
