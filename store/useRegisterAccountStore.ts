// import { TAccount } from '@/types/Account';
// import { create } from 'zustand';

// interface AccountState {
//   accounts: TAccount[];
//   selectedAccount: TAccount | null;
//   password: string;
//   isLoading: boolean;
//   setAccounts: (accounts: TAccount[]) => void;
//   setSelectedAccount: (account: TAccount | null) => void;
//   setPassword: (password: string) => void;
//   setLoading: (isLoading: boolean) => void;
//   reset: () => void;
// }

// export const useRegisterAccountStore = create<AccountState>((set) => ({
//   accounts: [],
//   selectedAccount: null,
//   password: '',
//   isLoading: false,
//   setAccounts: (accounts) => set({ accounts }),
//   setSelectedAccount: (account) => set({ selectedAccount: account }),
//   setPassword: (password) => set({ password }),
//   setLoading: (isLoading) => set({ isLoading }),
//   reset: () => set({ selectedAccount: null, password: '' }),
// }));
