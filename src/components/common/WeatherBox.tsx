import React from 'react';
import styled from 'styled-components';

interface WeatherBoxProps {
  children: React.ReactNode;
  title?: string;
}

const WeatherBox = ({ children, title }: WeatherBoxProps) => {
  return (
    <Box>
      <BoxTitle>{title}</BoxTitle>
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
