export type TEvent = {
  event_id: number;
  event_name: string;
  start_date_time: string;
  end_date_time: string;
  current_date: string;
  event_category: '기념일' | '생일' | '여행' | '약속' | '기타';
  all_day_status: '하루 종일' | '특정 시간';
  event_participants: TEventParticipants[];
};

type TEventParticipants = {
  participation_id: number;
  member_id: number;
  user_name: string;
  profile_link: string | null;
};

export type TEventReq = {
  event_category: 'TRAVEL' | 'BIRTHDAY' | 'DINING' | 'MEMORIAL' | 'OTHER';
  event_name: string;
  start_date_time: string;
  end_date_time: string;
  event_participants: number[];
  all_day_status: 'ALL_DAY' | 'SPECIFIC_TIME';
};
