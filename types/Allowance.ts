export type AllowanceResponse = {
  allowance_id: number;
  sender_id: number;
  sender_name: string;
  sender_profile: string;
  amount: number;
};

export type TSendAllowanceReq = {
  file: File;
  data: {
    to_id: number;
    amount: number;
    message: string;
  };
};
