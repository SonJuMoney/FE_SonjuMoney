export type TFeed = {
  feed_id: number;
  writer_id: number;
  writer_name: string;
  is_mine: boolean;
  writer_image: string;
  feed_type: 'NORMAL' | 'ALLOWANCE' | 'THANKS';
  message: string;
  like: number;
  is_update: boolean;
  contents: Image[];
  comments: Comment[];
  created_at: string;
};

type Image = {
  url: string;
  content_type: 'IMAGE' | 'VIDEO';
};

type Comment = {
  comment_id: number;
  writer_id: number;
  writer_name: string;
  writer_image: string;
  message: string;
  is_update: boolean;
  created_at: string;
};
