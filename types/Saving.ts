export type TSavingList = {
  date: string;
  transactions: TTransaction[];
};

export type TTransaction = {
  user_name: string;
  profile_link: string | null;
  created_at: string;
  message: string;
  amount: number;
  after_balance: number;
};
