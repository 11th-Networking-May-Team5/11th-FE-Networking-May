import React, { useState } from 'react';
import PlusIcon from '../../assets/icons/plus-front-clay.svg?react';
import useLocations from '../../hooks/useLocations.tsx';
import ModalAddLocation from '../Modal/ModalAddLocation/ModalAddLocation.tsx';
import SidebarListItem from './SidebarListItem.tsx';
import styled from 'styled-components';
import { useLocationStore } from '../../stores/useLocationStore.tsx';
import useAuth from '../../hooks/useUser.tsx';
import SidebarLogout from './SidebarLogout.tsx';

const SidebarList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { locations, addLocation, removeLocation } = useLocations();
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const { username, isLogin } = useAuth();

  /**
   *
   */
  const handleAddLocation = (location: string) => {
    addLocation(location);
    setIsModalOpen(false);
  };

  if (!isLogin) {
    return null;
  }

  return (
    <>
      <AddRow onClick={() => setIsModalOpen(true)}>
        <StyledIcon>
          <PlusIcon />
        </StyledIcon>
        <TitleText>추가하기</TitleText>
      </AddRow>
      <ListDescription>
        <span>{username}님이 추가한 장소</span>
      </ListDescription>
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

      <SidebarLogout />

      <ModalAddLocation
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
  margin-top: 40px;
`;

const ListDescription = styled.div`
  margin-top: 28px;
  padding: 8px 8px;
  width: 100%;
  border-bottom: 2px solid #eee;
  box-sizing: border-box;

  > span {
    font-size: 14px;
    font-weight: 600;
  }
`;

const LocationList = styled.div`
  margin-top: 12px;
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
