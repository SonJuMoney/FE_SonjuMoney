import { TSavings } from '@/types/Account';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SendSavingStore {
  selectedSaving: TSavings | null;
  amount: number;
  message: string;
  setSelectedSaving: (saving: TSavings | null) => void;
  setAmount: (amount: number) => void;
  setMessage: (message: string) => void;
  resetState: () => void;
}

const useSendSavingStore = create<SendSavingStore>()(
  persist(
    (set) => ({
      selectedSaving: null,
      amount: 0,
      message: '',
      setSelectedSaving: (saving) => set({ selectedSaving: saving }),
      setAmount: (amount) => set({ amount }),
      setMessage: (message) => set({ message }),
      resetState: () =>
        set({
          selectedSaving: null,
          message: '',
          amount: 0,
        }),
    }),
    {
      name: 'send-saving-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSendSavingStore;
