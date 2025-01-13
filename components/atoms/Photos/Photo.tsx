'use client';

import Delete from '@/assets/Icons/delete_24.svg';
import Image from 'next/image';

type PhotoProps = {
  imgUrl: string | File;
  onDelete: () => void;
};

export default function Photo({ imgUrl, onDelete }: PhotoProps) {
  const imageUrl =
    imgUrl instanceof File ? URL.createObjectURL(imgUrl) : imgUrl;

  return (
    <div className='relative w-[150px] h-[150px] flex-shrink-0'>
      <Image
        src={imageUrl}
        width={150}
        height={150}
        alt='photo'
        className='object-cover rounded-xl'
      />
      <Delete
        className='absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 cursor-pointer'
        onClick={onDelete}
      />
    </div>
  );
}
