import { Role } from '@/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface InviteCard {
  phoneValue: string;
  roleValue: Role;
}

interface RegisterFamilyState {
  familyName: string;
  selectedRole: string;
  inviteCards: InviteCard[];
  setFamilyName: (name: string) => void;
  setSelectedRole: (role: string) => void;
  addInviteCard: (card: InviteCard) => void;
  updateInviteCard: (index: number, card: InviteCard) => void;
  deleteInviteCard: (index: number) => void;
  resetState: () => void;
}

const useRegisterFamilyStore = create<RegisterFamilyState>()(
  persist(
    (set) => ({
      familyName: '',
      selectedRole: '',
      inviteCards: [],
      setFamilyName: (name) => set({ familyName: name }),
      setSelectedRole: (role) => set({ selectedRole: role }),
      addInviteCard: (card) =>
        set((state) => ({ inviteCards: [...state.inviteCards, card] })),
      updateInviteCard: (index, card) =>
        set((state) => ({
          inviteCards: state.inviteCards.map((c, i) =>
            i === index ? card : c
          ),
        })),
      deleteInviteCard: (index) =>
        set((state) => ({
          inviteCards: state.inviteCards.filter((_, i) => i !== index),
        })),
      resetState: () =>
        set({
          familyName: '',
          selectedRole: '',
          inviteCards: [],
        }),
    }),
    {
      name: 'register-family-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRegisterFamilyStore;
