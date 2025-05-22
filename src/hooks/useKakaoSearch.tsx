import React from 'react';
import useDebounce from './useDebounce';
import type { IKakaoSearchResponse } from '../types/Locations';

const KAKAO_STATUS = {
  OK: 'OK',
  ERROR: 'ERROR',
  ZERO_RESULT: 'ZERO_RESULT',
} as const;

declare global {
  interface Window {
    kakao: {
      maps: {
        services: {
          Places: new () => {
            keywordSearch: (
              keyword: string,
              callback: (
                result: IKakaoSearchResponse[],
                status: keyof typeof KAKAO_STATUS,
              ) => void,
            ) => void;
          };
        };
      };
    };
  }
}

interface UseKakaoSearchProps {
  keyword: string;
}

interface UseKakaoSearchReturn {
  searchResults: IKakaoSearchResponse[] | null;
}

const useKakaoSearch = ({ keyword }: UseKakaoSearchProps) => {
  const _return = React.useRef<UseKakaoSearchReturn>(
    {} as UseKakaoSearchReturn,
  );

  const placeSearchRef = React.useRef<InstanceType<
    typeof window.kakao.maps.services.Places
  > | null>(null);

  const [searchResults, setSearchResults] = React.useState<
    IKakaoSearchResponse[] | null
  >(null);

  const debouncedValue = useDebounce({ value: keyword });

  //
  // Search for places
  //
  React.useEffect(() => {
    if (!placeSearchRef.current) {
      return;
    }

    if (!debouncedValue) {
      return;
    }

    placeSearchRef.current.keywordSearch(debouncedValue, (result, status) => {
      console.log(typeof status);
      if (status === KAKAO_STATUS.OK) {
        setSearchResults(result);
      } else {
        setSearchResults(null);
      }
    });
  }, [placeSearchRef, debouncedValue]);

  //
  // Load Kakao search API
  //
  React.useEffect(() => {
    if (!placeSearchRef.current) {
      const { kakao } = window;

      if (!kakao) {
        return;
      }

      placeSearchRef.current = new kakao.maps.services.Places();
    }
  }, [placeSearchRef]);

  _return.current = {
    searchResults,
  };

  return {
    searchResults,
  };
};

export default useKakaoSearch;
