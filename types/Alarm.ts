export type TAlarm = {
  alarm_id: number;
  status: 'RECEIVED' | 'CHECKED';
  alarm_type:
    | 'ALLOWANCE'
    | 'THANKS'
    | 'SAVINGS'
    | 'FEED'
    | 'INVITE'
    | 'TRAVEL'
    | 'BIRTHDAY'
    | 'DINING'
    | 'EVENT'
    | 'MEMORIAL'
    | 'OTHERS';
  message: string;
  link_id: number;
  created_at: string;
  family_id: number;
};

export type TAlarmStatusResponse = {
  is_exist: boolean;
};
