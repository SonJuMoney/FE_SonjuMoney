export type TAccount = {
  mockacc_id: number;
  bank: string;
  balance: number;
  account_name: string;
  account_num: string;
};

export type TPswdReq = { pin: string; mockacc_id?: number };

export type TSetAccountReq = { mockacc_id: number; user_id?: number };

export type TSetSavingsAccountReq = {
  user_id: number;
  message: string;
  account_password: string;
  auto_transferable: boolean;
  pay_day?: number;
  pay_amount?: number;
};

export type TSavings = {
  user_name: string;
  account_id: number;
  account_name: string;
  bank: string;
  account_num: string;
  balance: number;
};
