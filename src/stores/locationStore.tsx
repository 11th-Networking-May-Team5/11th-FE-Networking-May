import { create } from 'zustand';

interface LocationState {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;

  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLocationStore = create<LocationState>(set => ({
  selectedLocation: null,
  setSelectedLocation: location => set({ selectedLocation: location }),

  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
