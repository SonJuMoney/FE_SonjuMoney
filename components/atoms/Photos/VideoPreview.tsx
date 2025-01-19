'use client';

import Delete from '@/public/Icons/delete_24.svg';

type VideoProps = {
  file: File;
  onDelete: (file: File) => void;
};

export default function VideoPreview({ file, onDelete }: VideoProps) {
  return (
    <div className='relative w-[150px] h-[150px] flex-shrink-0'>
      <div className='relative w-full h-full'>
        <video
          controls
          src={URL.createObjectURL(file)}
          style={{ width: '100%', maxHeight: '150px' }}
          className='border rounded-xl overflow-hidden object-cover'
        />
      </div>
      <Delete
        className='absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 cursor-pointer'
        onClick={onDelete}
      />
    </div>
  );
}
