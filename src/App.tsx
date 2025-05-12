import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Sidebar />
        <MainContaier></MainContaier>
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
`;

export default App;
