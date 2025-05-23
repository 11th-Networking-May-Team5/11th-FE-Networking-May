import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherTime from './components/WeatherTime/WeatherTime';
import WeatherWeekly from './components/WeatherWeekly/WeatherWeekly';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherDaily from './components/WeatherDaily/WeatherDaily';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Sidebar />
        <MainContainer>
          <WeatherDaily />
          <WeatherTime />
          <WeatherWeekly />
        </MainContainer>
      </Wrapper>
    </QueryClientProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  min-height: 100vh;
  height: 100%;
  padding: 24px;
  overflow-y: scroll;
`;

export default App;
