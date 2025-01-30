import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

export type ImageProps = {
  imgUrl: string | StaticImageData;
  size: number;
  border?: boolean;
};

const CircleImg = ({ imgUrl, size, border }: ImageProps) => {
  return (
    <Image
      src={imgUrl}
      alt={''}
      className={cn(
        `rounded-full aspect-square object-contain ${border && ' border border-disabled '}`
      )}
      width={size}
      height={size}
      sizes={`w-[${size}px] h-[${size}px]`}
    />
  );
};

export default CircleImg;
