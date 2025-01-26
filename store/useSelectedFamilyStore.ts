// stores/useFamilyStore.ts
import { TFamily } from '@/types/Family';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SelectedFamilyStore {
  selectedFamily: TFamily | null;
  setSelectedFamily: (family: TFamily | null) => void;
  hydrated: boolean;
  setHydrated: (state: boolean) => void;
  familyList: TFamily[] | [];
  setfamilyList: (familyList: TFamily[] | []) => void;
}

export const useSelectedFamilyStore = create<SelectedFamilyStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      setSelectedFamily: (family) => set({ selectedFamily: family }),
      hydrated: false,
      setHydrated: (state) => set({ hydrated: state }),
      familyList: [],
      setfamilyList: (familyList) => set({ familyList: familyList }),
    }),
    {
      name: 'selected-family-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
