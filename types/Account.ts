export type TAccount = {
  mockacc_id: number;
  bank: string;
  balance: number;
  account_name: string;
  account_num: string;
};

export type TPswdReq = { pin: string; mockacc_id?: number };
