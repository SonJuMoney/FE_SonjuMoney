export type TFeed = {
  id: number;
  writer_id: number;
  writer_name: string;
  writer_image: string;
  feed_type: 'NORMAL' | 'ALLOWANCE' | 'RESPONSE';
  message: string;
  like: number;
  contents: Image[];
  comments: Comment[];
  created_at: string;
};

type Image = {
  url: string;
  type: 'IMAGE' | 'VIDEO';
};

type Comment = {
  comment_id: number;
  writer_id: number;
  writer_name: string;
  writer_image: string;
  message: string;
  updated_at: string;
};
