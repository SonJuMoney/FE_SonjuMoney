import EmptyState from '@/components/molecules/EmptyState/EmptyState';

const NotFound = () => {
  return (
    <div className='pageLayout'>
      <div className='defaultLayout justify-center'>
        <EmptyState
          title='요청하신 페이지를 찾을 수 없어요'
          subtitle='주소가 잘못된 것 같아요'
          buttonText='홈으로 돌아가기'
          href='/home'
        />
      </div>
    </div>
  );
};

export default NotFound;
