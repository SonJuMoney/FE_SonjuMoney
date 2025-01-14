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
    | 'MEMORIAL'
    | 'OTHERS';
  message: '할아버지께서 용돈을 보내주셨어요.';
  link_id: number;
};
