export type TUser = {
  name: string;
  id: string;
  password: string;
  phone: string;
  resident: string;
  pin: string;
  gender: 'MALE' | 'FEMALE';
  profile: string;
};

export type Role = '할아버지' | '할머니' | '아빠' | '엄마' | '아들' | '딸' | '';

export type Child = {
  user_id: string;
  user_name: string;
};

export type TProfile = {
  username: string;
  userProfile: string;
  gender: string;
  birth: string;
};
