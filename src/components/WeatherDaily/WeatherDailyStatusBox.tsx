import React from 'react';
import styled from 'styled-components';

interface IWeatherDailyStatusBoxProps {
  title: string;
  value: string | number;
}

interface IBoxProps {
  $backgroundColor: string;
}

interface IBoxValueProps {
  $color: string;
}

// -----------------------------  Color Map  -----------------------------
type StatusWord =
  | '좋음'
  | '보통'
  | '나쁨'
  | '매우 나쁨'
  | '낮음'
  | '높음'
  | '매우 높음'
  | '위험';

const STATUS_COLOR_MAP: Record<
  StatusWord,
  { background: string; color: string }
> = {
  좋음: { background: '#CCE8FF', color: '#32A1FF' },
  보통: { background: '#CEFFCC', color: '#32FF35' },
  나쁨: { background: '#FFCCCC', color: '#FF3232' },
  '매우 나쁨': { background: '#FF3232', color: '#ffffff' },

  // 자외선 지수 ― 같은 위험도에 같은 팔레트 적용
  낮음: { background: '#CCE8FF', color: '#32A1FF' },
  높음: { background: '#FFCCCC', color: '#FF3232' },
  '매우 높음': { background: '#FF3232', color: '#ffffff' },
  위험: { background: '#FF3232', color: '#ffffff' },
};

// 일출 상자 전용 색
const SUNRISE_COLOR = { background: '#F6FFCC', color: '#FFC532' };

const WeatherDailyStatusBox = ({
  title,
  value,
}: IWeatherDailyStatusBoxProps) => {
  const { background, color } =
    title === '일출'
      ? SUNRISE_COLOR
      : (STATUS_COLOR_MAP[value as keyof typeof STATUS_COLOR_MAP] ?? {
          bg: '#eee',
          text: '#000',
        });

  return (
    <Box $backgroundColor={background}>
      <BoxTitle>{title}</BoxTitle>
      <BoxValue $color={color}>{value}</BoxValue>
    </Box>
  );
};

const Box = styled.div<IBoxProps>`
  display: flex;
  width: 120px;
  padding: 12px 18px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: ${({ $backgroundColor }) => $backgroundColor};
`;

const BoxTitle = styled.span`
  color: #292e2e;
  font-size: 12px;
  font-weight: 500;
`;

const BoxValue = styled.span<IBoxValueProps>`
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 600;
`;

export default WeatherDailyStatusBox;
