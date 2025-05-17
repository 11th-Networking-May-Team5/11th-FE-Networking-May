import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import WeatherBox from './components/common/WeatherBox';

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Sidebar />
        <MainContaier>
          <WeatherBox title="시간별 현황">
            <div>날씨이이</div>
          </WeatherBox>
        </MainContaier>
      </Wrapper>
    </div>
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
