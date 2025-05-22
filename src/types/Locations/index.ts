export interface ILocation {
  isPinned: boolean;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export type ICurrentLocation = Pick<
  ILocation,
  'latitude' | 'longitude' | 'name'
>;

export type ILocationWithCurrent = ILocation | ICurrentLocation;

export interface IKakaoSearchResponse {
  id: number;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
}
