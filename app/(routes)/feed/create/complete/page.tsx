import { fetchData } from '@/app/actions/fetchData';
import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import { AllowanceResponse } from '@/types/Allowance';
import Link from 'next/link';

export default async function CompletePage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className='pageLayout'>
      <Header title='소식 작성하기' showBackButton={false} />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              새로운 게시글이 <br />
              가족 소식에 전달되었어요
            </>
          }
          subTitle={`자주 업로드하시면 우리 가족이 더 행복합니다😁`}
          isCelebrate={true}
        />
      </div>
      <Link href='/feed' className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge type='submit' text='확인' />
      </Link>
    </div>
  );
}
