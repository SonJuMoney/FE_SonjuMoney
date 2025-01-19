import { TFamily } from '@/types/Family';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SavingsAccountStore {
  selectedFamily: TFamily | null;
  selectedChild: string;
  selectedDate: string;
  selectedAmount: number | 'custom';
  customAmount: string;
  message: string;
  setSelectedFamily: (family: TFamily) => void;
  setSelectedChild: (child: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedAmount: (amount: number | 'custom') => void;
  setCustomAmount: (custom: string) => void;
  setMessage: (message: string) => void;
  resetState: () => void;
}

const useSavingsAccountStore = create<SavingsAccountStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      selectedChild: '',
      selectedDate: '',
      selectedAmount: 100000,
      customAmount: '',
      message: '',
      setSelectedFamily: (family) => set({ selectedFamily: family }),
      setSelectedChild: (member) => set({ selectedChild: member }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedAmount: (amount) => set({ selectedAmount: amount }),
      setCustomAmount: (custom) => set({ customAmount: custom }),
      setMessage: (message) => set({ message }),
      resetState: () =>
        set({
          selectedFamily: null,
          selectedChild: '',
          selectedDate: '',
          selectedAmount: 100000,
          customAmount: '',
          message: '',
        }),
    }),
    {
      name: 'savings-account-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSavingsAccountStore;
