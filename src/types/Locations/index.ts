export interface ILocationResponse {
  isPinned?: boolean;
  isCurrent: boolean;
  id?: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface ILocationRequest {
  latitude: number;
  longitude: number;
  name: string;
}

export interface IKakaoSearchResponse {
  id: number;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
}
