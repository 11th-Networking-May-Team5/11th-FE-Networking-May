import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/icons/zoom-front-color.svg?react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

/**
 * InputField 컴포넌트
 * - 기본 HTML input 속성과 커스텀 라벨, 아이콘을 포함한 입력 필드
 *
 * @param {string} label - 입력 필드의 라벨
 * @param {string} description - 입력 필드의 설명
 * @param {InputFieldProps} props - 입력 필드 속성
 * @returns {JSX.Element}
 */
const InputField = ({ label, description, ...props }: InputFieldProps) => {
  return (
    <InputFieldWrapper>
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
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
  width: 100%;
`;

const Label = styled.label`
  color: #292e2e;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Description = styled.span`
  color: #292e2e;
  font-size: 12px;
  margin-bottom: 20px;
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
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: #a4a4a4;
    font-weight: 400;
  }
`;

const StyledSmallIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default InputField;
