import { Child } from './user';

export type TFamily = {
  family_id: number;
  family_name: string;
  members: TMember[];
};

export type TMember = {
  member_id: number;
  user_id: number;
  member_name: string;
  member_role: string;
  profile_link: string;
};

export type TSetFamilyReq = {
  role: string;
  family_name: string;
  add_members: {
    phone: string;
    role: string;
  }[];
  add_children: Child[];
};
