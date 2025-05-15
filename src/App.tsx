import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="App">
      <Wrapper>
        <Sidebar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setIsModalOpen={setIsModalOpen}
      />
        <MainContaier></MainContaier>
      </Wrapper>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

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
