import { Child, Role } from '@/types/user';
import { create } from 'zustand';

interface InviteCard {
  phoneValue: string;
  roleValue: Role;
}

interface RegisterFamilyState {
  familyName: string;
  selectedRole: string;
  inviteCards: InviteCard[];
  selectedChilds: Child[];
  setFamilyName: (name: string) => void;
  setSelectedRole: (role: string) => void;
  addInviteCard: (card: InviteCard) => void;
  updateInviteCard: (index: number, card: InviteCard) => void;
  deleteInviteCard: (index: number) => void;
  setSelectedChilds: (childs: Child[]) => void;
  resetState: () => void;
}

const useRegisterFamilyStore = create<RegisterFamilyState>()((set) => ({
  familyName: '',
  selectedRole: '',
  inviteCards: [],
  selectedChilds: [],
  setFamilyName: (name) => set({ familyName: name }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  addInviteCard: (card) =>
    set((state) => ({ inviteCards: [...state.inviteCards, card] })),
  updateInviteCard: (index, card) =>
    set((state) => ({
      inviteCards: state.inviteCards.map((c, i) => (i === index ? card : c)),
    })),
  deleteInviteCard: (index) =>
    set((state) => ({
      inviteCards: state.inviteCards.filter((_, i) => i !== index),
    })),
  setSelectedChilds: (childs) => set(() => ({ selectedChilds: childs })),
  resetState: () =>
    set({
      familyName: '',
      selectedRole: '',
      inviteCards: [],
      selectedChilds: [],
    }),
}));

export default useRegisterFamilyStore;
