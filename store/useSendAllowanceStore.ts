import { TFamily, TMember } from '@/types/Family';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SendAllowanceStore {
  selectedFamily: TFamily | null;
  selectedMember: TMember | null;
  amount: string;
  message: string;
  files: File[];
  setSelectedFamily: (family: TFamily) => void;
  setSelectedMember: (member: TMember | null) => void;
  setAmount: (amount: string) => void;
  setMessage: (message: string) => void;
  setFiles: (files: File[]) => void;
  resetState: () => void;
}

const useSendAllowanceStore = create<SendAllowanceStore>()(
  persist(
    (set) => ({
      selectedFamily: null,
      selectedMember: null,
      amount: '',
      message: '',
      files: [],
      setSelectedFamily: (family) => set({ selectedFamily: family }),
      setSelectedMember: (member) => set({ selectedMember: member }),
      setAmount: (amount) => set({ amount }),
      setMessage: (message) => set({ message }),
      setFiles: (files) => set({ files }),
      resetState: () =>
        set({
          selectedFamily: null,
          selectedMember: null,
          amount: '',
          message: '',
          files: [],
        }),
    }),
    {
      name: 'send-allowance-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSendAllowanceStore;
