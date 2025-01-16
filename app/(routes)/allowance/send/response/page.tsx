'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import TextArea from '@/components/atoms/TextArea/TextArea';
import AddPhoto from '@/components/molecules/AddPhotos/AddPhoto';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addPhotos, deletePhoto } from '@/lib/fileUtils';

const SendResponse = () => {
  const [files, setFiles] = useState<File[]>([]);
  const MAX_FILES = 5;
  const router = useRouter();

  const skip = () => {
    router.push('/allowance/send/complete');
  };

  const handleAddPhotos = (newFiles: File[]) => {
    const updatedFiles = addPhotos(files, newFiles, MAX_FILES);
    setFiles(updatedFiles);
  };

  const handleDeletePhoto = (fileToDelete: File) => {
    const updatedFiles = deletePhoto(files, fileToDelete);
    setFiles(updatedFiles);
  };

  const sendResponse = () => {};

  return (
    <div>
      <Header
        title='용돈 보내기'
        actionButton={{
          label: '건너뛰기',
          onClick: skip,
        }}
      />

      <div className='space-y-5'>
        <PageTitle
          title='님에게
          마음을 전해주세요'
        />

        <AddPhoto
          maxLength={5}
          files={files}
          onAddPhotos={handleAddPhotos}
          onDelete={handleDeletePhoto}
        />
        <TextArea />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='전송하기' onClick={sendResponse} />
      </div>
    </div>
  );
};

export default SendResponse;
