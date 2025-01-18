import { fetchData } from '@/app/actions/fetchData';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import { GetPaginationResult, ResponseType } from '@/hooks/useApi';
import { TFeed } from '@/types/Feed';
import FeedList from './FeedList';

async function getInitialFeeds(): Promise<
  ResponseType<GetPaginationResult<TFeed>>
> {
  const response = fetchData('/feeds?page=1&family_id=1')
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      throw new Error('');
    });

  return response;
}

export default async function FeedPage() {
  // const initialData = await getInitialFeeds();
  const initialData: ResponseType<GetPaginationResult<TFeed>> = {
    isSuccess: true,
    code: 1000,
    message: '요청성공.',
    result: {
      hasNext: true,
      page: 0,
      content: [
        {
          feed_id: 1,
          writer_id: 2,
          writer_name: '박준용',
          is_mine: true,
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'NORMAL',
          message: '가족여행 너무 즐거웠다~',
          like: 20,
          is_update: true,
          created_at: '2024-01-13',
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              content_type: 'IMAGE',
            },
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              content_type: 'VIDEO',
            },
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              content_type: 'IMAGE',
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
              is_update: true,
              created_at: '2024-01-14',
            },
            {
              comment_id: 2,
              writer_id: 33,
              writer_name: '김미진',
              writer_image:
                'https://avatars.githubusercontent.com/u/44547064?v=4',
              message: '너무 재밌었다!!',
              is_update: true,
              created_at: '2024-01-14',
            },
          ],
        },
        {
          feed_id: 4,
          writer_id: 33,
          writer_name: '김미진',
          is_mine: true,
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'ALLOWANCE',
          message: '용돈으로 맛있는거 먹으렴',
          is_update: true,
          like: 20,
          created_at: '2024-01-14',
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              content_type: 'IMAGE',
            },
          ],
          comments: [],
        },
        {
          feed_id: 8,
          writer_id: 27,
          writer_name: '김미진',
          is_mine: true,
          writer_image: 'https://avatars.githubusercontent.com/u/44547064?v=4',
          feed_type: 'THANKS',
          like: 20,
          message: '용돈 감사합니다~!',
          is_update: true,
          created_at: '2024-01-15',
          contents: [
            {
              url: 'https://avatars.githubusercontent.com/u/44547064?v=4',
              content_type: 'IMAGE',
            },
          ],
          comments: [],
        },
      ],
    },
  };

  return (
    <div className='bg-pageBg pb-16'>
      <LogoHeader showFamily />
      <div className='defaultLayout'>
        <FeedList initialData={initialData} familyId={1} />
      </div>
    </div>
  );
}
