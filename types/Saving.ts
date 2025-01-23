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

export type TSavingLimit = {
  receiver_name: string;
  total_payment: number;
  month_payment: number;
  month_available_amount: number;
};
