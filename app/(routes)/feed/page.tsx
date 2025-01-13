'use client';

import FeedCard from '@/components/molecules/FeedCard/FeedCard';

const Feed = () => {
  return (
    <div className='p-5 bg-background flex flex-col gap-4 overflow-y-scroll'>
      <FeedCard
        feed={{
          id: 1,
          writer_id: 2,
          writer_name: '박준용',
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'NORMAL',
          message: '가족여행 너무 즐거웠다~',
          created_at: '2024-01-13',
          like: 5,
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://www.youtube.com/embed/19g66ezsKAg',
              type: 'VIDEO',
            },
          ],
          comments: [
            {
              comment_id: 1,
              writer_id: 47,
              writer_name: '임형석',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message: '사진 잘나왔다!',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message: '너무 재밌었다!!',
              updated_at: '2024-01-14',
            },
          ],
        }}
      />
      <FeedCard
        feed={{
          id: 1,
          writer_id: 2,
          writer_name: '박준용',
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'NORMAL',
          message: '가족여행 너무 즐거웠다~',
          created_at: '2024-01-13',
          like: 0,
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://www.youtube.com/embed/19g66ezsKAg',
              type: 'VIDEO',
            },
          ],
          comments: [],
        }}
      />
      <FeedCard
        feed={{
          id: 1,
          writer_id: 2,
          writer_name: '박준용',
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'NORMAL',
          message: '가족여행 너무 즐거웠다~',
          created_at: '2024-01-13',
          like: 0,
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              type: 'IMAGE',
            },
            {
              url: 'https://www.youtube.com/embed/19g66ezsKAg',
              type: 'VIDEO',
            },
          ],
          comments: [
            {
              comment_id: 1,
              writer_id: 47,
              writer_name: '박준용',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message: '사진 못못나왔다!',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message:
                '너무 재밌었다!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 다음에 또 놀러가요',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message:
                '너무 재밌었다!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 다음에 또 놀러가요',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message:
                '너무 재밌었다!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 다음에 또 놀러가요',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message:
                '너무 재밌었다!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 다음에 또 놀러가요',
              updated_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message:
                '너무 재밌었다!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 다음에 또 놀러가요',
              updated_at: '2024-01-14',
            },
          ],
        }}
      />
    </div>
  );
};

export default Feed;
