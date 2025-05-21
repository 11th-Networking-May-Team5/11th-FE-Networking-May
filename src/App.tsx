import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleSelectLocation = (location: string | null) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <Wrapper>
        <Sidebar
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />
        <MainContainer></MainContainer>
      </Wrapper>
    </div>
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
`;

export default App;
