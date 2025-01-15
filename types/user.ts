export type TUser = {
  name: string;
  id: string;
  password: string;
  phone: string;
  resident: string;
  pin: string;
  gender: 'Male' | 'FEMALE';
  profile: string;
};

export type Role =
  | '할아버지'
  | '할머니'
  | '아빠'
  | '엄마'
  | '손자'
  | '손녀'
  | '';

export type Child = {
  user_id: string;
  user_name: string;
};
