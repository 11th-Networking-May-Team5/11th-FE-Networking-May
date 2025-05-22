import React from 'react';
import InputField from '../../common/InputField';
import styled from 'styled-components';
import type { IModalAddLocationAddStep } from './ModalAddLocation';

interface ModalAddLocationConfirmProps {
  addStep: IModalAddLocationAddStep;
  selectedSearchLocationName: string;
  onLocationNameChange: (name: string) => void;
}

const ModalAddLocationConfirm = ({
  addStep,
  selectedSearchLocationName,
  onLocationNameChange,
}: ModalAddLocationConfirmProps) => {
  /**
   *
   */
  const handleLocationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationNameChange(e.target.value);
  };

  if (addStep !== 'confirm') {
    return null;
  }

  return (
    <Wrapper>
      <InputField
        label="장소 이름 입력"
        description="저장할 장소의 이름을 수정할 수 있어요."
        placeholder="장소 이름을 입력하세요."
        value={selectedSearchLocationName}
        onChange={handleLocationNameChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
`;

export default ModalAddLocationConfirm;
