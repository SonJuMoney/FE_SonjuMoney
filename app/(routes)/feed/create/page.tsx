import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import FeedForm from './FeedForm';

export default async function CreateFeedpage() {
  return (
    <div className='pageLayout'>
      <Header title='소식 작성하기' />
      <div>
        <div className='px-4 pt-[25px]'>
          <PageTitle title={`게시글 작성하기`} />
        </div>
        <FeedForm />
      </div>
    </div>
  );
}
