import { Card } from '@/components/atoms/Cards/Card';
import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import CommentInput from '@/components/atoms/Inputs/CommentInput';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import CommentOff from '@/public/Icons/commentOff_20.svg';
import CommentOn from '@/public/Icons/commentOn_20.svg';
import LikeOff from '@/public/Icons/likeOff_20.svg';
import LikeOn from '@/public/Icons/likeOn_20.svg';
import ShowMore from '@/public/Icons/showMore_24.svg';
import { TFeed } from '@/types/Feed';
import Image from 'next/image';
import { useState } from 'react';

const FeedCard = ({ feed }: { feed: TFeed }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Card className='flex flex-col w-full gap-[10px] py-[16px]'>
      <div className='flex justify-between w-full px-[16px]'>
        <div className='flex user gap-[10px] items-center'>
          <CircleImg imgUrl={feed.writer_image} size={30} />
          <span className='font-bold text-[14px]'>{feed.writer_name}</span>
        </div>
        <ShowMore />
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <CarouselContent>
          {feed.contents.map((image) => (
            <CarouselItem key={image.url}>
              {image.type === 'IMAGE' ? (
                <div className='relative w-full aspect-square'>
                  <Image src={image.url} alt='' fill className='object-cover' />
                </div>
              ) : (
                <div className='relative w-full aspect-square pointer-events-none'>
                  <iframe
                    src={image.url}
                    allowFullScreen
                    className='w-full h-full'
                  />
                  <div
                    className='absolute inset-0 z-10'
                    style={{ pointerEvents: isDragging ? 'auto' : 'none' }}
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex justify-between px-[16px] items-center'>
        <div className='flex  gap-2'>
          <div className='flex gap-1'>
            {feed.like > 0 ? <LikeOn /> : <LikeOff />}
            <span
              className={`text-[13px] ${feed.like > 0 ? 'text-appColor' : 'text-placeHolder'}`}
            >
              {feed.like}
            </span>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <div className='flex gap-1 cursor-pointer'>
                {feed.comments.length > 0 ? <CommentOn /> : <CommentOff />}
                <span
                  className={`text-[13px] ${feed.comments.length > 0 ? 'text-appColor' : 'text-placeHolder'}`}
                >
                  {feed.comments.length}
                </span>
              </div>
            </DrawerTrigger>
            <DrawerContent className='max-h-[500px]'>
              <DrawerHeader>
                <DrawerTitle>댓글</DrawerTitle>
              </DrawerHeader>
              <div className='p-4'>
                {/* 기존 댓글 목록 */}
                <div className='flex-1 space-y-4 mb-[50px] max-h-[500px] overflow-y-scroll'>
                  {feed.comments.map((comment, index) => (
                    <div key={index} className='flex items-start gap-2 '>
                      <CircleImg imgUrl={comment.writer_image} size={24} />
                      <div>
                        <span className='font-bold text-sm'>
                          {comment.writer_name}
                        </span>
                        <p className='text-sm'>{comment.message}</p>
                      </div>
                    </div>
                  ))}
                  {/* 댓글 입력 영역 */}
                  <div className='flex gap-2'>
                    <CommentInput onSubmit={() => {}} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <span className='font-semibold text-[14px]'>
          {new Date(feed.created_at).toLocaleDateString('KO-KR')}
        </span>
      </div>

      <span className='px-[16px] whitespace-break-spaces font-semibold'>
        {feed.message}
      </span>
    </Card>
  );
};

export default FeedCard;
