'use client';

import Delete from '@/public/Icons/delete_24.svg';
import Image from 'next/image';

type PhotoProps = {
  imgUrl: string | File;
  onDelete: (file: File) => void;
};

export default function Photo({ imgUrl, onDelete }: PhotoProps) {
  const imageUrl =
    imgUrl instanceof File ? URL.createObjectURL(imgUrl) : imgUrl;

  return (
    <div className='relative w-[150px] h-[150px] flex-shrink-0'>
      <div className='relative w-full h-full'>
        <Image
          src={imageUrl}
          fill
          sizes='150px'
          alt='photo'
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
