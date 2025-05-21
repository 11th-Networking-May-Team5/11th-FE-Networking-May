import React, { useState } from 'react';
import PlusIcon from '../../assets/icons/plus-front-clay.svg?react';
import useLocations from '../../hooks/useLocation.tsx';
import AddLocationModal from '../Modal/AddLocationModal.tsx';
import SidebarListItem from './SidebarListItem.tsx';
import styled from 'styled-components';
import { useLocationStore } from '../../stores/useLocationStore.tsx';

const SidebarList = () => {
  const { locations, addLocation, removeLocation } = useLocations();
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLocation = (location: string) => {
    addLocation(location);
    setIsModalOpen(false);
  };

  return (
    <>
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
            onClick={() => setSelectedLocation(location)}
            onDelete={() => removeLocation(location)}
          />
        ))}
      </LocationList>

      <AddLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddLocation}
      />
    </>
  );
};

const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const TitleText = styled.div`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SidebarList;
