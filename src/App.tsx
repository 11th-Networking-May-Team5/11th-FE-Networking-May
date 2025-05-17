import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherTime from './components/WeatherTime/WeatherTime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Sidebar />
        <MainContaier>
          <WeatherTime />
        </MainContaier>
      </Wrapper>
    </QueryClientProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContaier = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 100vh;
`;

export default App;
