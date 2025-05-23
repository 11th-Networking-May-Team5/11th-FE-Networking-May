import React from 'react';
import type { ILocationResponse } from '../types/Locations';
import { getKakaoLocationAddress } from '../apis/Kakao/kakao';

interface IUseCurrentLocationReturn {
  isLoading: boolean;
  currentLocation?: Omit<ILocationResponse, 'name'>;
  currentLoacationAddress?: string;
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
  const [locationAddress, setLocationAddress] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);

  //
  //
  //
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ isCurrent: true, latitude, longitude });
          setIsLoading(false);
        },
        () => {
          setLocation({
            isCurrent: true,
            latitude: 37.496075,
            longitude: 127.030588,
          });
          setLocationAddress('강남구 역삼동');
          setIsLoading(false);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 30000,
          timeout: 27000,
        },
      );
    }
  }, []);

  //
  //
  //
  React.useEffect(() => {
    if (location) {
      const fetchLocationAddress = async () => {
        try {
          const res = await getKakaoLocationAddress({ ...location, name: '' });

          const { region_1depth_name, region_2depth_name, region_3depth_name } =
            res.documents[0];

          if (
            region_1depth_name.includes('특별시') ||
            region_1depth_name.includes('광역시')
          ) {
            setLocationAddress(`${region_2depth_name}  ${region_3depth_name}`);
          } else {
            setLocationAddress(region_2depth_name);
          }
        } catch {
          setLocationAddress('');
        }
      };

      fetchLocationAddress();
    }
  }, [location]);

  _return.current = {
    isLoading,
    currentLocation: location,
    currentLoacationAddress: locationAddress,
  };

  return _return.current;
};

export default useCurrentLocation;
