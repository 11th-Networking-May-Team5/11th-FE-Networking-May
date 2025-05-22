import React from 'react';
import InputField from '../../common/InputField';
import styled from 'styled-components';

const ModalAddLocationConfirm = () => {
  return (
    <Wrapper>
      <InputField
        label="장소 이름 입력"
        description="저장할 장소의 이름을 입력해주세요"
        placeholder="장소 이름을 입력하세요."
        value="KFC 홍대점"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
`;

export default ModalAddLocationConfirm;
