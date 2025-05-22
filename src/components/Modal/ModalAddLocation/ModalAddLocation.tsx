import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import SearchIcon from '../../assets/icons/zoom-front-color.svg?react';
import CheckIcon from '../../assets/icons/tick-front-color.svg?react';
import ExampleIcon from '../../assets/icons/Clouds.svg?react';

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
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const mockResults = [
    { name: 'KFC 광화문점', address: '서울 종로구 세종로 161-1' },
    { name: 'KFC 부산서면점', address: '부산 부산진구 부전동 241-17' },
    { name: 'KFC 홍익대점', address: '서울 마포구 동교동 165-8' },
  ];

  const filteredResults = mockResults.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  const selected = mockResults.find(item => item.name === selectedName);

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} showDeleteButton>
      <TitleRow>
        <StyledIcon>
          <ExampleIcon />
        </StyledIcon>
        <TitleText>날씨 위치 추가</TitleText>
      </TitleRow>

      <InputField>
        <Label>장소 이름</Label>
        <InputFieldRow>
          <Input
            placeholder="장소를 입력해주세요."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <StyledSmallIcon>
            <SearchIcon />
          </StyledSmallIcon>
        </InputFieldRow>
      </InputField>

      <ResultList>
        {filteredResults.map(item => (
          <ResultItem
            key={item.name}
            $selected={selectedName === item.name}
            onClick={() => setSelectedName(item.name)}
          >
            <div>
              <ItemName>{item.name}</ItemName>
              <ItemAddress>{item.address}</ItemAddress>
            </div>
            {selectedName === item.name && (
              <CheckMark>
                <CheckIcon width={36} height={36} />
              </CheckMark>
            )}
          </ResultItem>
        ))}
      </ResultList>

      <ButtonWrapper>
        <ConfirmButton
          onClick={() => {
            if (selected) {
              onConfirm(selected.name);
            }
          }}
        >
          확인
        </ConfirmButton>
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

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 48px 0;
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

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  height: 240px;
  padding: 8px 16px;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #a4a4a4;
  overflow-y: auto;
`;

const ResultItem = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #a4a4a4;
  cursor: pointer;
  position: relative;
`;

const ItemName = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const ItemAddress = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  color: #a4a4a4;
`;

const CheckMark = styled.div`
  position: absolute;
  right: 8px;
  bottom: 7.5px;
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
