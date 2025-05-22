import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../../assets/icons/tick-front-color.svg?react';
import InputField from '../../common/InputField';
import useKakaoSearch from '../../../hooks/useKakaoSearch';
import type { IKakaoSearchResponse } from '../../../types/Locations';
import type { IModalAddLocationAddStep } from './ModalAddLocation';
import useDelayedLoading from '../../../hooks/useDelayLoading';
import LoadingSpinner from '../../common/LoadingSpinner';

interface ModalAddLocationSearchProps {
  addStep: IModalAddLocationAddStep;
  selectedSearchLocation: IKakaoSearchResponse | null;
  onSelectedSearchLocation: (location: IKakaoSearchResponse | null) => void;
}

const ModalAddLocationSearch = ({
  addStep,
  selectedSearchLocation,
  onSelectedSearchLocation,
}: ModalAddLocationSearchProps) => {
  const [keyword, setKeyword] = React.useState('');

  const { isLoading, searchResults } = useKakaoSearch({ keyword });

  const delayedLoading = useDelayedLoading({ isLoading });

  /**
   *
   */
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  /**
   *
   */
  const handleLocationSelect = (location: IKakaoSearchResponse) => {
    if (location.id === selectedSearchLocation?.id) {
      onSelectedSearchLocation(null);
    } else {
      onSelectedSearchLocation(location);
    }
  };

  /**
   *
   */
  const renderResultList = () => {
    if (delayedLoading) {
      return <LoadingSpinner />;
    }

    return (
      <ResultList>
        {searchResults?.map(result => (
          <ResultItem
            key={result.id}
            $selected={result.id === selectedSearchLocation?.id}
            onClick={() => handleLocationSelect(result)}
          >
            <div>
              <ItemName>{result.place_name}</ItemName>
              <ItemAddress>{result.road_address_name}</ItemAddress>
            </div>
            {selectedSearchLocation?.id === result.id && (
              <CheckMark>
                <CheckIcon width={36} height={36} />
              </CheckMark>
            )}
          </ResultItem>
        ))}
      </ResultList>
    );
  };

  //
  //
  //
  React.useEffect(() => {
    onSelectedSearchLocation(null);
  }, [searchResults]);

  if (addStep !== 'search') {
    return null;
  }

  return (
    <>
      <InputField
        placeholder="장소의 키워드를 입력해주세요."
        value={keyword}
        onChange={handleKeywordChange}
      />
      {/* <ResultList>
        {searchResults?.map(result => (
          <ResultItem
            key={result.id}
            $selected={result.id === selectedSearchLocation?.id}
            onClick={() => handleLocationSelect(result)}
          >
            <div>
              <ItemName>{result.place_name}</ItemName>
              <ItemAddress>{result.road_address_name}</ItemAddress>
            </div>
            {selectedSearchLocation?.id === result.id && (
              <CheckMark>
                <CheckIcon width={36} height={36} />
              </CheckMark>
            )}
          </ResultItem>
        ))}
      </ResultList> */}
      {renderResultList()}
    </>
  );
};

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 4px;
  overflow: scroll;
`;

const ResultItem = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
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
