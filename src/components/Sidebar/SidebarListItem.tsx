import styled from 'styled-components';
import PinIcon from '../../assets/icons/pin-front-clay.svg?react';
import PinColorIcon from '../../assets/icons/pin-front-color.svg?react';
import TrashIcon from '../../assets/icons/trash-can-front-color.svg?react';

interface Props {
  location: string;
  selected: boolean;
  hovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  onDelete: () => void;
}

const SidebarListItem = ({ location, selected, hovered, onClick, onHover, onDelete }: Props) => {
  return (
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
        <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <TrashIcon width={24} height={24} />
        </DeleteButton>
      )}
    </Item>
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
