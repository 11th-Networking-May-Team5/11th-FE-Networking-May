import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import ExampleIcon from '../../../assets/icons/Clouds.svg?react';
import ModalAddLocationSearch from './ModalAddLocationSearch';
import ModalAddLocationConfirm from './ModalAddLocationConfirm';

type ModalAddLocationStep = 'search' | 'confirm';

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
  const [step, setStep] = React.useState<ModalAddLocationStep>('confirm');

  if (!isOpen) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose} showDeleteButton>
      <ModalContainer>
        <TitleRow>
          <StyledIcon>
            <ExampleIcon />
          </StyledIcon>
          <TitleText>날씨 위치 추가</TitleText>
        </TitleRow>

        <FlexGrowerContainer>
          {step === 'search' && <ModalAddLocationSearch />}
          {step === 'confirm' && <ModalAddLocationConfirm />}
        </FlexGrowerContainer>

        <ButtonWrapper>
          <ConfirmButton onClick={() => {}}>확인</ConfirmButton>
        </ButtonWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default ModalAddLocation;

const ModalContainer = styled.div`
  display: flex;
  width: 480px;
  height: 500px;
  flex-direction: column;
  justify-content: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
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

const FlexGrowerContainer = styled.div`
  display: flex;
  height: 0;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ConfirmButton = styled.button`
  padding: 8px 28px;
  border-radius: 6px;
  background: #292e2e;
  font-size: 14px;
  font-weight: 500;
  color: white;
  border: none;
  cursor: pointer;
`;
