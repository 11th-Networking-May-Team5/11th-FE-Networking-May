export interface IPostResponse {
  success: boolean;
  message: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IKakaoSearchResponse {
  id: number;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
}
