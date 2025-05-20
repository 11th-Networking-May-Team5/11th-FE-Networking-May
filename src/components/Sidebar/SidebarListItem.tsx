import { useState } from 'react';
import styled from 'styled-components';
import PinIcon from '../../assets/icons/pin-front-clay.svg?react';
import PinColorIcon from '../../assets/icons/pin-front-color.svg?react';
import TrashIcon from '../../assets/icons/trash-can-front-color.svg?react';
import DeleteModal from '../Modal/DeleteModal';
import { useLocationStore } from '../../stores/locationStore';

interface SidebarListItemProps {
  location: string;
  onDelete: () => void;
}

const SidebarListItem = ({ location, onDelete }: SidebarListItemProps) => {
  const selectedLocation = useLocationStore(state => state.selectedLocation);
  const setSelectedLocation = useLocationStore(
    state => state.setSelectedLocation,
  );
  const [pinnedLocation, setPinnedLocation] = useState<string | null>(null);

  const isSelected = selectedLocation === location;
  const isPinned = pinnedLocation === location;
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setSelectedLocation(isSelected ? null : location);
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedLocation(isPinned ? null : location);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
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
          <PinButton onClick={handlePinClick}>
            {isPinned ? (
              <PinColorIcon width={24} height={24} />
            ) : (
              <PinIcon width={24} height={24} />
            )}
          </PinButton>
          <Text>{location}</Text>
        </Content>

        {isHovered && (
          <DeleteButton onClick={handleDeleteClick}>
            <TrashIcon width={24} height={24} />
          </DeleteButton>
        )}
      </Item>

      <DeleteModal
        open={showModal}
        locationName={location}
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
