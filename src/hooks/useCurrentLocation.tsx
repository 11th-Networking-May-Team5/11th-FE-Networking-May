import React from 'react';
import type { ILocationResponse } from '../types/Locations';

interface IUseCurrentLocationReturn {
  isLoading: boolean;
  currentLocation?: Omit<ILocationResponse, 'name'>;
}

/**
 * 현재 위치 정보(위도, 경도)를 가져오는 커스텀 훅
 *
 * @returns {IUseCurrentLocation} 위치 정보
 */
const useCurrentLocation = () => {
  const _return = React.useRef<IUseCurrentLocationReturn>(
    {} as IUseCurrentLocationReturn,
  );

  const [location, setLocation] =
    React.useState<Omit<ILocationResponse, 'name'>>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ isCurrent: true, latitude, longitude });
        setIsLoading(false);
      });
    }
  }, []);

  _return.current = {
    isLoading,
    currentLocation: location,
  };

  return _return.current;
};

export default useCurrentLocation;
