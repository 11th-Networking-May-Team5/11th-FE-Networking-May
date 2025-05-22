import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/icons/zoom-front-color.svg?react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * InputField 컴포넌트
 * - 기본 HTML input 속성과 커스텀 라벨, 아이콘을 포함한 입력 필드
 *
 * @param {string} label - 입력 필드의 라벨
 * @param {InputFieldProps} props - 입력 필드 속성
 * @returns {JSX.Element}
 */
const InputField = ({ label, ...props }: InputFieldProps) => {
  return (
    <InputFieldWrapper>
      <Label>{label}</Label>
      <InputFieldRow>
        <Input {...props} />
        <StyledSmallIcon>
          <SearchIcon />
        </StyledSmallIcon>
      </InputFieldRow>
    </InputFieldWrapper>
  );
};

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
`;

const InputFieldRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px 8px;
  border: none;
  color: #a4a4a4;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  outline: none;
`;

const StyledSmallIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default InputField;
