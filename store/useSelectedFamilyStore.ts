// stores/useFamilyStore.ts
import { TFamily } from '@/types/Family';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SelectedFamilyStore {
  selectedFamily: TFamily | null;
  setSelectedFamily: (family: TFamily) => void;
}

export const useSelectedFamilyStore = create<SelectedFamilyStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      setSelectedFamily: (family) => set({ selectedFamily: family }),
    }),
    {
      name: 'selected-family-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
