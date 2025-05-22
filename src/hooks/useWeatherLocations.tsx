import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLocations,
  postLocation,
  deleteLocation,
  postLocationPin,
  deleteLocationPin,
} from '../apis/Locations/locations';
import type { ILocationRequest, ILocationResponse } from '../types/Locations';
import useCurrentLocation from './useCurrentLocation';
import { useSelectedLocationStore } from '../stores/useSelectedLocationStore';
import { locationSort } from '../utils/locationSort';
import useUser from './useUser';

interface UseWeatherLocationsReturn {
  isLoading: boolean;
  locations?: ILocationResponse[];
  selectedLocation?: ILocationResponse | null;
  addLocation: (location: ILocationRequest) => void;
  deleteLocation: (location: ILocationResponse) => void;
  pinLocation: (location: ILocationResponse) => void;
  unpinLocation: (location: ILocationResponse) => void;
  selectLocation: (location: ILocationResponse) => void;
}

const LOCATION_STALE_TIME = 1000 * 60 * 60;
const LOCATION_GC_TIME = Infinity;

const useWeatherLocations = () => {
  const _return = React.useRef<UseWeatherLocationsReturn>(
    {} as UseWeatherLocationsReturn,
  );

  const queryClient = useQueryClient();

  const [locationsWithCurrent, setLocationsWithCurrent] =
    React.useState<ILocationResponse[]>();

  const { currentLocation: _currentLocation } = useCurrentLocation();

  const { selectedLocation, setSelectedLocation } = useSelectedLocationStore();

  const { isLogin } = useUser();

  const { data: locations, isPending } = useQuery<ILocationResponse[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
    retry: 1,
    enabled: isLogin,
    staleTime: LOCATION_STALE_TIME,
    gcTime: LOCATION_GC_TIME,
  });

  const currentLocation = React.useMemo(() => {
    if (!_currentLocation) return undefined;
    return {
      ..._currentLocation,
      name: '현재 위치',
    };
  }, [_currentLocation]);

  /**
   *
   */
  const addLocationMutation = useMutation({
    mutationFn: postLocation,
    onMutate: async newLocation => {
      await queryClient.cancelQueries({ queryKey: ['locations'] });

      const prev = queryClient.getQueryData<ILocationResponse[]>(['locations']);

      queryClient.setQueryData<ILocationResponse[]>(['locations'], old => {
        const convertedNewLocation: ILocationResponse = {
          ...newLocation,
          isCurrent: false,
        };

        return old ? [...old, convertedNewLocation] : [convertedNewLocation];
      });

      return { prev };
    },
    onError: (_err, _newLocation, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['locations'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  /**
   *
   */
  const deleteLocationMutation = useMutation({
    mutationFn: deleteLocation,
    onMutate: async deleteLocation => {
      await queryClient.cancelQueries({ queryKey: ['locations'] });

      const prev = queryClient.getQueryData<ILocationResponse[]>(['locations']);

      queryClient.setQueryData<ILocationResponse[]>(['locations'], old =>
        old ? old.filter(loc => loc?.id && loc.id !== deleteLocation.id) : [],
      );

      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['locations'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  /**
   *
   */
  const pinLocationMutation = useMutation({
    mutationFn: postLocationPin,
    onMutate: async pinLocation => {
      await queryClient.cancelQueries({ queryKey: ['locations'] });

      const prev = queryClient.getQueryData<ILocationResponse[]>(['locations']);

      queryClient.setQueryData<ILocationResponse[]>(['locations'], old =>
        old
          ? old.map(loc =>
              loc?.id && loc.id === pinLocation.id
                ? { ...loc, isPinned: true }
                : loc,
            )
          : [],
      );

      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['locations'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  /**
   *
   */
  const unpinLocationMutation = useMutation({
    mutationFn: deleteLocationPin,
    onMutate: async unpinLocation => {
      await queryClient.cancelQueries({ queryKey: ['locations'] });

      const prev = queryClient.getQueryData<ILocationResponse[]>(['locations']);

      queryClient.setQueryData<ILocationResponse[]>(['locations'], old =>
        old
          ? old.map(loc =>
              loc?.id && loc.id === unpinLocation.id
                ? { ...loc, isPinned: false }
                : loc,
            )
          : [],
      );

      return { prev };
    },
    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['locations'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  /**
   *
   */
  const selectLocation = (location: ILocationResponse) => {
    setSelectedLocation(location);
  };

  //
  //
  //
  React.useEffect(() => {
    if (!locations || !currentLocation) return;

    const sortedLocations = locationSort(
      locations.map(location => ({
        ...location,
        isCurrent: false,
      })),
    );

    setLocationsWithCurrent([currentLocation, ...sortedLocations]);
    setSelectedLocation(currentLocation);
  }, [locations, currentLocation]);

  _return.current = {
    isLoading: isPending || !locationsWithCurrent,
    locations: locationsWithCurrent,
    selectedLocation,
    addLocation: addLocationMutation.mutate,
    deleteLocation: deleteLocationMutation.mutate,
    pinLocation: pinLocationMutation.mutate,
    unpinLocation: unpinLocationMutation.mutate,
    selectLocation,
  };

  return _return.current;
};

export default useWeatherLocations;
