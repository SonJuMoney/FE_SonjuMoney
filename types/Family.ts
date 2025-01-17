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
};
