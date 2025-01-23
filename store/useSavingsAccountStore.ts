import { TFamily, TMember } from '@/types/Family';
import { create } from 'zustand';

interface SavingsAccountStore {
  selectedFamily: TFamily | null;
  selectedChild: TMember | null;
  selectedDate: string;
  selectedAmount: number | 'custom';
  customAmount: string;
  isAutoTransfer: boolean;
  message: string;
  setSelectedFamily: (family: TFamily) => void;
  setSelectedChild: (child: TMember | null) => void;
  setSelectedDate: (date: string) => void;
  setSelectedAmount: (amount: number | 'custom') => void;
  setCustomAmount: (custom: string) => void;
  setIsAutoTransfer: (transfer: boolean) => void;
  setMessage: (message: string) => void;
  resetState: () => void;
}

const useSavingsAccountStore = create<SavingsAccountStore>()((set) => ({
  selectedFamily: null,
  selectedChild: null,
  selectedDate: '',
  selectedAmount: 100000,
  customAmount: '',
  isAutoTransfer: false,
  message: '',
  setSelectedFamily: (family) => set({ selectedFamily: family }),
  setSelectedChild: (member) => set({ selectedChild: member }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  setCustomAmount: (custom) => set({ customAmount: custom }),
  setIsAutoTransfer: (tranfer) => set({ isAutoTransfer: tranfer }),
  setMessage: (message) => set({ message }),
  resetState: () =>
    set({
      selectedFamily: null,
      selectedChild: null,
      selectedDate: '',
      selectedAmount: 100000,
      customAmount: '',
      isAutoTransfer: false,
      message: '',
    }),
}));

export default useSavingsAccountStore;
