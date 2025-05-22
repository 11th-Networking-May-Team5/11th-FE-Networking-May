import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../../assets/icons/tick-front-color.svg?react';
import InputField from '../../common/InputField';

const ModalAddLocationSearch = () => {
  const [keyword, setKeyword] = React.useState('');
  const [selectedName, setSelectedName] = React.useState<string | null>(null);

  const mockResults = [
    { name: 'KFC 광화문점', address: '서울 종로구 세종로 161-1' },
    { name: 'KFC 부산서면점', address: '부산 부산진구 부전동 241-17' },
    { name: 'KFC 홍익대점', address: '서울 마포구 동교동 165-8' },
  ];

  const filteredResults = mockResults.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  /**
   *
   */
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Wrapper>
      <InputField
        placeholder="장소의 키워드를 입력해주세요."
        value={keyword}
        onChange={handleKeywordChange}
      />

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const ResultList = styled.div`
  display: flex;
  flex: 1;
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

export default ModalAddLocationSearch;
