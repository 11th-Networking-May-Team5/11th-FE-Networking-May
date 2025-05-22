import React from 'react';
import styled from 'styled-components';
import Skeleton from './Skeleton';

interface WeatherBoxProps {
  children: React.ReactNode;
  title?: string;
}

const WeatherBox = ({ children, title }: WeatherBoxProps) => {
  return (
    <Box>
      <Skeleton
        isLoading={false}
        width="160px"
        height="32px"
        style={{ marginLeft: '12px' }}
      >
        <BoxTitle>{title}</BoxTitle>
      </Skeleton>
      {children}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 960px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  background: #fff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
`;

const BoxTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0;
`;

export default WeatherBox;
