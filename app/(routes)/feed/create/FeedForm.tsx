'use client';

import { createFeed } from '@/app/actions/createFeed';
import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import TextArea, { TextAreaRef } from '@/components/atoms/TextArea/TextArea';
import AddPhoto from '@/components/molecules/AddPhotos/AddPhoto';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

export default function FeedForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const textAreaRef = useRef<TextAreaRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { selectedFamily } = useSelectedFamilyStore();

  const MAX_FILES = 5;

  const handleAddPhotos = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const updatedFiles = [...prev];
      for (const file of newFiles) {
        if (updatedFiles.length < MAX_FILES) {
          updatedFiles.push(file);
        }
      }
      return updatedFiles;
    });
  }, []);

  const handleDeletePhoto = useCallback((fileToDelete: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
  }, []);

  const handleValueChange = useCallback((value: string) => {
    setIsDisabled(!value.length);
  }, []);

  async function handleSubmit(formData: FormData) {
    const message = textAreaRef.current?.getValue() || '';

    formData.delete('message');
    formData.delete('file');

    formData.append('message', message);

    // 파일들 추가
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      await createFeed(formData).then(() => {
        router.push('/feed/create/complete');
      });
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
        <input
          type='hidden'
          name='family_id'
          value={selectedFamily?.family_id}
        />
        <TextArea
          ref={textAreaRef}
          maxLength={300}
          placeholder={`가족과 함께할 소식을 전해보세요💕`}
          onValueChange={handleValueChange}
        />
        <div className='fixed bottom-0 left-0 w-full p-5'>
          <ButtonLarge type='submit' text='전송하기' disabled={isDisabled} />
        </div>
      </form>
    </>
  );
}
