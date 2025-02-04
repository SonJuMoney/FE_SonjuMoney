'use client';

import { sendResponse } from '@/app/actions/allowance';
import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import TextArea, { TextAreaRef } from '@/components/atoms/TextArea/TextArea';
import AddPhoto from '@/components/molecules/AddPhotos/AddPhoto';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

export default function MessageForm({
  allowanceId,
  sender_name,
}: {
  allowanceId: string;
  sender_name: string;
}) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const textAreaRef = useRef<TextAreaRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const MAX_FILES = 1;

  const handleAddPhotos = (newFiles: File[]) => {
    const updatedFiles = [...files];
    for (const file of newFiles) {
      if (updatedFiles.length < MAX_FILES) {
        updatedFiles.push(file);
      }
    }
    setFiles(updatedFiles);
  };

  const handleDeletePhoto = (fileToDelete: File) => {
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
  };

  const handleValueChange = useCallback((value: string) => {
    setIsDisabled(!value.length);
  }, []);

  async function handleSubmit(formData: FormData) {
    const message = textAreaRef.current?.getValue() || '';
    formData.set('message', message);

    files.forEach((file) => {
      formData.append('file', file);
    });
    try {
      await sendResponse(formData);
      router.push(`/allowance/${allowanceId}/message/complete`);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  }

  return (
    <>
      <AddPhoto
        maxLength={MAX_FILES}
        files={files}
        onAddPhotos={handleAddPhotos}
        onDelete={handleDeletePhoto}
      />
      <form ref={formRef} action={handleSubmit} className='flex flex-col px-5'>
        <input type='hidden' name='allowanceId' value={allowanceId} />
        <TextArea
          ref={textAreaRef}
          maxLength={300}
          placeholder={`${sender_name}께 감사한 마음을 전해보세요💕`}
          onValueChange={handleValueChange}
        />
        <div className='fixed bottom-0 left-0 w-full p-5'>
          <ButtonLarge type='submit' text='전송하기' disabled={isDisabled} />
        </div>
      </form>
    </>
  );
}
