import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Family = {
  familyId: number;
  familyName: string;
  familyMember: string[];
};

interface SendAllowanceStore {
  selectedFamily: Family | null;
  selectedMember: string;
  amount: string;
  setSelectedFamily: (family: Family) => void;
  setSelectedMember: (member: string) => void;
  setAmount: (amount: string) => void;
}

const useSendAllowanceStore = create<SendAllowanceStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      selectedMember: '',
      amount: '',
      setSelectedFamily: (family) => set({ selectedFamily: family }),
      setSelectedMember: (member) => set({ selectedMember: member }),
      setAmount: (amount) => set({ amount }),
    }),
    {
      name: 'send-allowance-storage',
      storage: createJSONStorage(() => sessionStorage), // Use localStorage for persistence
    }
  )
);

export default useSendAllowanceStore;
