import { TFamily } from '@/types/Family';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SavingsAccountStore {
  selectedFamily: TFamily | null;
  selectedChild: string;
  setSelectedFamily: (family: TFamily) => void;
  setSelectedChild: (child: string) => void;
  resetState: () => void;
}

const useSavingsAccountStore = create<SavingsAccountStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      selectedChild: '',
      setSelectedFamily: (family) => set({ selectedFamily: family }),
      setSelectedChild: (member) => set({ selectedChild: member }),
      resetState: () =>
        set({
          selectedFamily: null,
          selectedChild: '',
        }),
    }),
    {
      name: 'savings-account-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSavingsAccountStore;
