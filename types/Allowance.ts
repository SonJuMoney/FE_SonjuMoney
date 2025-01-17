export type TSendAllowanceReq = {
  image: File;
  data: {
    to_id: number;
    amount: number;
    message: string;
  };
};
