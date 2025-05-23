import { useState } from 'react';
import styled from 'styled-components';
import pinIcon from '../../assets/icons/pin-front-clay.png';
import pinColorIcon from '../../assets/icons/pin-front-color.png';
import trashIcon from '../../assets/icons/trash-can-front-color.png';
import DeleteModal from '../Modal/DeleteModal';

interface SidebarListItemProps {
  location: string;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete: () => void;
}

const SidebarListItem = ({
  location,
  isSelected = false,
  onClick,
  onDelete,
}: SidebarListItemProps) => {
  const [pinnedLocation, setPinnedLocation] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isPinned = pinnedLocation === location;

  /**
   *
   */
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedLocation(isPinned ? null : location);
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
    onDelete();
    setShowModal(false);
  };

  /**
   *
   */
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Item
        $selected={isSelected}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Content>
          <PinButton onClick={handlePinClick}>
            {isPinned ? (
              <SmallIcon src={pinColorIcon} alt="pin" />
            ) : (
              <SmallIcon src={pinIcon} alt="un-pin" />
            )}
          </PinButton>
          <Text>{location}</Text>
        </Content>

        {isHovered && (
          <DeleteButton onClick={handleDeleteClick}>
            <SmallIcon src={trashIcon} alt="trash" />
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
