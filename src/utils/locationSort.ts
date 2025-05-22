import type { ILocationResponse } from '../types/Locations';

export const locationSort = (locations: ILocationResponse[]) => {
  const newLocations = [...locations];

  return newLocations.sort((a, b) => {
    if (a.isCurrent || b.isCurrent) {
      return a.isCurrent ? -1 : 1;
    }

    if (a.isPinned && !b.isPinned) {
      return -1;
    }

    if (!a.isPinned && b.isPinned) {
      return 1;
    }

    if (a.id && b.id) {
      return a.id - b.id;
    }

    return 0;
  });
};
