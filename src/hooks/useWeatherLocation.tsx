import React from 'react';
import type { ILocation } from '../types/common';

interface IUuseWeatherLocationReturn {
  isLoading: boolean;
  location: ILocation | undefined;
}

/**
 * 위치 정보(위도, 경도)를 가져오는 커스텀 훅
 * 선택된 위치의 정보를 반환
 * 선택된 위치가 없을 경우 현재 위치 반환
 *
 * @returns {IUuseWeatherLocationReturn} 위치 정보
 */
const useWeatherLocation = () => {
  const _return = React.useRef<IUuseWeatherLocationReturn>(
    {} as IUuseWeatherLocationReturn,
  );

  const [location, setLocation] = React.useState<ILocation>();
  const [isLoading, setIsLoading] = React.useState(true);

  /**
   * TODO: 선택된 장소에 대한 위치 정보 반환
   */

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoading(false);
      });
    }
  }, []);

  _return.current = {
    isLoading,
    location,
  };

  return _return.current;
};

export default useWeatherLocation;
