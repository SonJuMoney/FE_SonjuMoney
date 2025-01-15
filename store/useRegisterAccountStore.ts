// import { create } from 'zustand';
// import { Account } from '../types/account';

// interface AccountState {
//   accounts: Account[];
//   selectedAccount: Account | null;
//   password: string;
//   isLoading: boolean;
//   setAccounts: (accounts: Account[]) => void;
//   setSelectedAccount: (account: Account | null) => void;
//   setPassword: (password: string) => void;
//   setLoading: (isLoading: boolean) => void;
//   reset: () => void;
// }

// export const useAccountStore = create<AccountState>((set) => ({
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
