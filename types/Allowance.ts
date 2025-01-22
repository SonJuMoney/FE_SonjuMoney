export type AllowanceResponse = {
  allowance_id: number;
  sender_name: string;
  amount: number;
};

export type AllowanceReq = {
  image: File;
  data: {
    to_id: number;
    allowance_id: number;
    message: string;
  };
};

export type TSendAllowanceReq = {
  file: File;
  data: {
    to_id: number;
    amount: number;
    message: string;
  };
};
