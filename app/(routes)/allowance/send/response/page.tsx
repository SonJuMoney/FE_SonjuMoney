'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import TextArea, { TextAreaRef } from '@/components/atoms/TextArea/TextArea';
import AddPhoto from '@/components/molecules/AddPhotos/AddPhoto';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { addPhotos, deletePhoto } from '@/lib/fileUtils';

const SendResponse = () => {
  const { selectedMember, setMessage, setFiles } = useSendAllowanceStore();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const MAX_FILES = 1;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const textAreaRef = useRef<TextAreaRef>(null);
  const router = useRouter();

  const skip = () => {
    router.push('/allowance/send/password');
  };

  const handleAddPhotos = (newFiles: File[]) => {
    const updatedFiles = addPhotos(localFiles, newFiles, MAX_FILES);
    setLocalFiles(updatedFiles);
  };

  const handleDeletePhoto = (fileToDelete: File) => {
    const updatedFiles = deletePhoto(localFiles, fileToDelete);
    setLocalFiles(updatedFiles);
  };

  const handleTextAreaChange = (value: string) => {
    setIsButtonEnabled(value.trim().length > 0);
  };

  const sendResponse = () => {
    const message = textAreaRef.current?.getValue() || '';
    setMessage(message);
    setFiles(localFiles);

    console.log({
      message,
      files: localFiles,
    });

    router.push('/allowance/send/password');
  };

  return (
    <div>
      <Header
        title='용돈 보내기'
        actionButton={{
          label: '건너뛰기',
          onClick: skip,
        }}
      />

      <div>
        <div className='p-5'>
          <PageTitle
            title={`${selectedMember}님에게
마음을 전해주세요`}
          />
        </div>

        <AddPhoto
          maxLength={1}
          files={localFiles}
          onAddPhotos={handleAddPhotos}
          onDelete={handleDeletePhoto}
        />
        <div className='p-5'>
          <TextArea ref={textAreaRef} onValueChange={handleTextAreaChange} />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='전송하기'
          disabled={!isButtonEnabled}
          onClick={sendResponse}
        />
      </div>
    </div>
  );
};

export default SendResponse;
