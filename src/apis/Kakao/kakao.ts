import type { ILocationRequest } from '../../types/Locations';

export const getKakaoLocationAddress = async (location: ILocationRequest) => {
  const url = new URL(
    'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
  );
  url.searchParams.set('x', String(location.longitude));
  url.searchParams.set('y', String(location.latitude));

  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  return res.json();
};
