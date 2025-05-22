import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import ExampleIcon from '../../../assets/icons/Clouds.svg?react';
import ModalAddLocationSearch from './ModalAddLocationSearch';
import ModalAddLocationConfirm from './ModalAddLocationConfirm';
import type { IKakaoSearchResponse } from '../../../types/common';

export type IModalAddLocationAddStep = 'search' | 'confirm';

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
  const [addStep, setAddStep] =
    React.useState<IModalAddLocationAddStep>('search');
  const [selectedSearchLocation, setSelectedSearchLocation] =
    React.useState<IKakaoSearchResponse | null>(null);

  /**
   *
   */
  const handleLocationSelect = (location: IKakaoSearchResponse | null) => {
    setSelectedSearchLocation(location);
  };

  /**
   *
   */
  const handleLocationNameChange = (name: string) => {
    setSelectedSearchLocation(prev => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        place_name: name,
      };
    });
  };

  /**
   *
   */
  const handlePrevButtonClick = () => {
    if (addStep === 'confirm') {
      setAddStep('search');
    }
  };

  /**
   *
   */
  const handleNextButtonClick = () => {
    if (addStep === 'search') {
      setAddStep('confirm');
    }
  };

  /**
   *
   */
  const handleConfirmButtonClick = () => {
    if (addStep === 'confirm') {
      console.log(selectedSearchLocation);
    }
  };

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
          <ModalAddLocationSearch
            addStep={addStep}
            selectedSearchLocation={selectedSearchLocation}
            onSelectedSearchLocation={handleLocationSelect}
          />
          <ModalAddLocationConfirm
            addStep={addStep}
            selectedSearchLocationName={
              selectedSearchLocation?.place_name || ''
            }
            onLocationNameChange={handleLocationNameChange}
          />
        </FlexGrowerContainer>

        <ButtonWrapper>
          {addStep === 'confirm' ? (
            <ConfirmButton onClick={handlePrevButtonClick}>이전</ConfirmButton>
          ) : (
            <div />
          )}
          {addStep === 'search' && (
            <ConfirmButton onClick={handleNextButtonClick}>다음</ConfirmButton>
          )}
          {addStep === 'confirm' && (
            <ConfirmButton onClick={handleConfirmButtonClick}>
              확인
            </ConfirmButton>
          )}
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
  justify-content: space-between;
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
