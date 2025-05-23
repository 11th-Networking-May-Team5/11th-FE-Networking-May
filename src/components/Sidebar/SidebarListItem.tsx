import { useState } from 'react';
import styled from 'styled-components';
import pinIcon from '../../assets/icons/pin-front-clay.png';
import pinColorIcon from '../../assets/icons/pin-front-color.png';
import trashIcon from '../../assets/icons/trash-can-front-color.png';
import LocationIcon from '../../assets/icons/location.svg?react';
import DeleteModal from '../Modal/DeleteModal';
import type { ILocationResponse } from '../../types/Locations';
import useWeatherLocations from '../../hooks/useWeatherLocations';

interface SidebarListItemProps {
  location: ILocationResponse;
  isSelected?: boolean;
}

const SidebarListItem = ({ location }: SidebarListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    deleteLocation,
    pinLocation,
    unpinLocation,
    selectedLocation,
    selectLocation,
  } = useWeatherLocations();

  const isSelected = [
    location.isCurrent && selectedLocation?.isCurrent,
    selectedLocation?.id === location.id,
  ].some(Boolean);

  /**
   *
   */
  const handleClick = () => {
    selectLocation(location);
  };

  /**
   *
   */
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (location?.isPinned === undefined) {
      return;
    }

    if (location.isPinned) {
      unpinLocation(location);
    } else {
      pinLocation(location);
    }
  };

  /**
   *
   */
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  /**
   *
   */
  const handleConfirmDelete = () => {
    deleteLocation(location);
    setShowModal(false);
  };

  /**
   *
   */
  const handleCancel = () => {
    setShowModal(false);
  };

  /**
   *
   */
  const renderIcon = () => {
    if (location?.isCurrent) {
      return <LocationIcon width={24} height={24} />;
    }

    return location?.isPinned ? (
      <SmallIcon src={pinColorIcon} alt="pin" />
    ) : (
      <SmallIcon src={pinIcon} alt="un-pin" />
    );
  };

  return (
    <>
      <Item
        $selected={isSelected}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Content>
          <PinButton onClick={handlePinClick}>{renderIcon()}</PinButton>
          <Text>{location.name}</Text>
        </Content>

        {isHovered && !location.isCurrent && (
          <DeleteButton onClick={handleDeleteClick}>
            <SmallIcon src={trashIcon} alt="trash" />
          </DeleteButton>
        )}
      </Item>

      <DeleteModal
        open={showModal}
        locationName={location.name}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default SidebarListItem;

const Item = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  background-color: ${({ $selected }) =>
    $selected ? '#F2F2F2' : 'transparent'};
  box-shadow: ${({ $selected }) =>
    $selected ? '-2px 2px 2px 1px rgba(0, 0, 0, 0.10)' : 'none'};
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 12px;
`;

const SmallIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const PinButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;
