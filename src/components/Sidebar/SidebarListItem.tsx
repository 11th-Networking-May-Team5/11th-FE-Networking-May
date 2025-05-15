import { useState } from 'react';
import styled from 'styled-components';
import PinIcon from '../../assets/icons/pin-front-clay.svg?react';
import PinColorIcon from '../../assets/icons/pin-front-color.svg?react';
import TrashIcon from '../../assets/icons/trash-can-front-color.svg?react';
import DeleteModal from '../DeleteModal';

interface Props {
  location: string;
  selected: boolean;
  hovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  onDelete: () => void;
}

/**
 * @component SidebarListItem
 * @description 사이드바의 위치 항목 컴포넌트 (삭제 모달 포함)
 */
const SidebarListItem = ({ location, selected, hovered, onClick, onHover, onDelete }: Props) => {
    const [showModal, setShowModal] = useState(false);

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
      $selected={selected}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <Content>
        <SmallIcon>
          {selected ? <PinColorIcon /> : <PinIcon />}
        </SmallIcon>
        <Text>{location}</Text>
      </Content>

      {hovered && (
        <DeleteButton onClick={handleDeleteClick}>
          <TrashIcon width={24} height={24} />
        </DeleteButton>
      )}
    </Item>

    {showModal && (
       <DeleteModal
          locationName={location}
          onCancel={handleCancel}
          onConfirm={handleConfirmDelete}
        />
      )}
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
  background-color: ${({ $selected }) => ($selected ? '#F2F2F2' : 'transparent')};
  box-shadow: ${({ $selected }) =>
    $selected ? '-2px 2px 2px 1px rgba(0, 0, 0, 0.10)' : 'none'};
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #F2F2F2;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 12px;
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
`;

const SmallIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;
