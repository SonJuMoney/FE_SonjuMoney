import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Family = {
  familyId: number;
  familyName: string;
  familyMember: string[];
};

interface SendAllowanceStore {
  selectedFamily: Family | null;
  setSelectedFamily: (family: Family) => void;
}

const useSendAllowanceStore = create<SendAllowanceStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      setSelectedFamily: (family) => set({ selectedFamily: family }),
    }),
    {
      name: 'send-allowance-storage',
      storage: createJSONStorage(() => sessionStorage), // Use localStorage for persistence
    }
  )
);

export default useSendAllowanceStore;
