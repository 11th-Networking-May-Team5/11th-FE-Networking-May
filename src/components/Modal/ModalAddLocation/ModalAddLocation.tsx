import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import ExampleIcon from '../../../assets/icons/Clouds.svg?react';
import ModalAddLocationSearch from './ModalAddLocationSearch';

export type ModalAddLocationStep = 'search' | 'confirm';

interface ModalAddLocationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (location: string) => void;
}

const ModalAddLocation = ({
  isOpen,
  onClose,
  onConfirm,
}: ModalAddLocationProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose} showDeleteButton>
      <TitleRow>
        <StyledIcon>
          <ExampleIcon />
        </StyledIcon>
        <TitleText>날씨 위치 추가</TitleText>
      </TitleRow>

      <ModalAddLocationSearch />

      <ButtonWrapper>
        <ConfirmButton onClick={() => {}}>확인</ConfirmButton>
      </ButtonWrapper>
    </Modal>
  );
};

export default ModalAddLocation;

const TitleRow = styled.div`
  width: 480px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`;

const StyledIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.h2`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ConfirmButton = styled.button`
  padding: 6px 30px;
  border-radius: 6px;
  background: #292e2e;
  color: white;
  border: none;
  cursor: pointer;
`;
