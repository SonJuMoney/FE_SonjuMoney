import { create } from 'zustand';

export type SignUpData = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  residentNum: string;
};

type SignUpStore = {
  signUpData: SignUpData | null;
  setSignUpData: (data: SignUpData) => void;
  clearSignUpData: () => void;
};

const useSignUpStore = create<SignUpStore>((set) => ({
  signUpData: null,
  setSignUpData: (data) => set({ signUpData: data }),
  clearSignUpData: () => set({ signUpData: null }),
}));

export default useSignUpStore;
