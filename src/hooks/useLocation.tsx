import { useState } from 'react';

export function useLocations() {
  const [locations, setLocations] = useState<string[]>([
    '강남역 1번 출구',
    'RATTHAT',
    '파이홀',
    '청수공장명',
    '롯데월드',
    '구관',
    'Osiu',
  ]);

  const addLocation = (location: string) => {
    setLocations(prev => [...prev, location]);
  };

  const removeLocation = (location: string) => {
    setLocations(prev => prev.filter(l => l !== location));
  };

  return {
    locations,
    addLocation,
    removeLocation,
  };
}
