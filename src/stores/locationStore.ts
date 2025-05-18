import { create } from 'zustand';

interface LocationState {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;

  locations: string[];
  addLocation: (location: string) => void;
  removeLocation: (location: string) => void;

  pinnedLocations: string[];
  togglePinned: (location: string) => void;

  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  selectedLocation: null,
  setSelectedLocation: location => set({ selectedLocation: location }),

  locations: [
    '강남역 1번 출구',
    'RATTHAT',
    '파이홀',
    '청수공장명',
    '롯데월드',
    '구관',
    'Osiu',
  ],
  addLocation: location =>
    set(state => ({ locations: [...state.locations, location] })),
  removeLocation: location =>
    set(state => ({
      locations: state.locations.filter(l => l !== location),
      pinnedLocations: state.pinnedLocations.filter(p => p !== location),
      selectedLocation:
        state.selectedLocation === location ? null : state.selectedLocation,
    })),

  pinnedLocations: [],
  togglePinned: location => {
    const { pinnedLocations } = get();
    const isPinned = pinnedLocations.includes(location);
    set({
      pinnedLocations: isPinned
        ? pinnedLocations.filter(l => l !== location)
        : [...pinnedLocations, location],
    });
  },

  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
