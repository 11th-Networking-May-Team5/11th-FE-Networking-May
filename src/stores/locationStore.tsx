import { create } from 'zustand';

interface LocationState {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
}

export const useLocationStore = create<LocationState>(set => ({
  selectedLocation: null,
  setSelectedLocation: location => set({ selectedLocation: location }),
}));
