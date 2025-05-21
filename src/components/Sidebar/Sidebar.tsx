import { useState } from 'react';
import styled from 'styled-components';
import SidebarListItem from './SidebarListItem.tsx';
import MapIcon from '../../assets/icons/map-pin-front-color.svg?react';
import PlusIcon from '../../assets/icons/plus-front-clay.svg?react';
import useLocations from '../../hooks/useLocation.tsx';
import AddLocationModal from '../Modal/AddLocationModal.tsx';

interface SidebarProps {
  selectedLocation: string | null;
  onSelectLocation: (location: string) => void;
}

const Sidebar = ({ selectedLocation, onSelectLocation }: SidebarProps) => {
  const { locations, addLocation, removeLocation } = useLocations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLocation = (location: string) => {
    addLocation(location);
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <TitleRow>
          <StyledIcon>
            <MapIcon />
          </StyledIcon>
          <TitleText>위치 목록</TitleText>
        </TitleRow>

        <AddRow onClick={() => setIsModalOpen(true)}>
          <StyledIcon>
            <PlusIcon />
          </StyledIcon>
          <TitleText>추가하기</TitleText>
        </AddRow>

        <LocationList>
          {locations.map(location => (
            <SidebarListItem
              key={location}
              location={location}
              isSelected={selectedLocation === location}
              onClick={() => onSelectLocation(location)}
              onDelete={() => removeLocation(location)}
            />
          ))}
        </LocationList>
      </Wrapper>

      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddLocation}
      />
    </>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 248px;
  height: 100vh;
  padding: 48px 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: 0 48px 48px 0;
  background: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TitleText = styled.div`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const AddRow = styled(TitleRow)`
  cursor: pointer;
`;

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;
