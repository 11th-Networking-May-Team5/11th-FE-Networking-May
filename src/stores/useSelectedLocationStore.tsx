import { create } from 'zustand';
import type { ILocationResponse } from '../types/Locations';

interface ISelectedLocationState {
  selectedLocation: ILocationResponse | null;
  setSelectedLocation: (location: ILocationResponse) => void;
}

export const useSelectedLocationStore = create<ISelectedLocationState>(set => ({
  selectedLocation: null,
  setSelectedLocation: location => set({ selectedLocation: location }),
}));
