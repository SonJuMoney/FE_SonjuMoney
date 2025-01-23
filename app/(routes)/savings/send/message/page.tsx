'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import TextArea, { TextAreaRef } from '@/components/atoms/TextArea/TextArea';
import useSendSavingStore from '@/store/useSendSavingStore';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const InputMessage = () => {
  const { selectedSaving, setMessage } = useSendSavingStore();
  const textAreaRef = useRef<TextAreaRef>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (value: string) => {
    setIsEnabled(value.trim().length > 0);
    setError(value.trim().length === 0);
  };

  const onClick = () => {
    if (!isEnabled) {
      setError(true);
      return;
    }

    const message = textAreaRef.current?.getValue() || '';
    setMessage(message);

    router.push('/savings/send/pin');
  };

  return (
    <div className='pageLayout'>
      <Header title='메세지 작성하기' />
      <div className='defaultLayout gap-5'>
        <PageTitle
          title={`${selectedSaving?.user_name}님에게
마음을 전해주세요`}
          subTitle={`메세지를 작성해 사랑을 표현해보세요`}
        />

        <TextArea
          ref={textAreaRef}
          maxLength={300}
          placeholder='메세지를 적어보세요 (300자 이내)'
          error={error}
          errorMsg='메세지를 입력해주세요'
          onValueChange={handleChange}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='다음' disabled={!isEnabled} onClick={onClick} />
      </div>
    </div>
  );
};

export default InputMessage;
