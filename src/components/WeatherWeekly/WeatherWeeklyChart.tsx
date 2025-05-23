import styled from 'styled-components';
import type { IWeeklyWeatherItem } from '../../types/WeatherWeekly';
import WeatherWeeklyItem from './WeatherWeeklyItem';

interface WeatherWeeklyListProps {
  weatherWeeklyList?: IWeeklyWeatherItem[];
}

const WeatherWeeklyChart = ({ weatherWeeklyList }: WeatherWeeklyListProps) => {
  return (
    <List>
      {weatherWeeklyList?.map(item => (
        <WeatherWeeklyItem key={item.date} item={item} />
      ))}
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
