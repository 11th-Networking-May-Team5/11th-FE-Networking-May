import type {
  ILocationRequest,
  ILocationResponse,
} from '../../types/Locations';
import { axiosInstance } from '../axiosInstance';

export const getLocations = async () => {
  const res = await axiosInstance.get('/locations');

  return res.data.data.locations;
};

export const postLocation = async (location: ILocationRequest) => {
  const res = await axiosInstance.post('/locations', location);

  return res.data.data;
};

export const deleteLocation = async (location: ILocationResponse) => {
  const res = await axiosInstance.delete(`/locations/${location.id}`);

  return res.data.data;
};
