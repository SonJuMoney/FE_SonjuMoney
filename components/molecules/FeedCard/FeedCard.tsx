'use client';

import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useFeedApi } from '@/hooks/useFeedApi/useFeedApi';
import LoveLetter from '@/public/AnimatedIcons/LoveLetter.png';
import DefaultProfile from '@/public/Avatar/Default_Profile.svg';
import CommentOff from '@/public/Icons/commentOff_20.svg';
import CommentOn from '@/public/Icons/commentOn_20.svg';
import LikeOff from '@/public/Icons/likeOff_20.svg';
import LikeOn from '@/public/Icons/likeOn_20.svg';
import ShowMore from '@/public/Icons/showMore_24.svg';
import { TFeed } from '@/types/Feed';
import ReactPlayer from 'react-player/lazy';
import Image from 'next/image';
import { useState } from 'react';
import CommentDrawer from './CommentDrawer';

const FeedCard = ({ feed }: { feed: TFeed }) => {
  const { likeFeed, deleteFeed } = useFeedApi();
  const [open, setOpen] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const { toast } = useToast();

  const handleLike = (feedId: number) => {
    setIsLikeAnimating(true);
    likeFeed(feedId);
    setTimeout(() => setIsLikeAnimating(false), 1000);
  };

  const handleDelete = (feed_id: number) => {
    deleteFeed(feed_id, {
      onSuccess: () => {
        toast({
          description: '피드가 삭제되었습니다.',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          description: '피드 삭제에 실패했습니다.',
        });
      },
    });
  };

  const videoLoaderUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/videos/stream?video=${path}`;
  };

  return (
    <div className='flex flex-col w-full gap-[10px] py-[16px] bg-white'>
      <div className='flex justify-between w-full px-[16px]'>
        {feed.feed_type === 'THANKS' ? (
          <div className='flex user gap-[10px] items-center'>
            <Image src={LoveLetter} alt='Bear' width={30} height={30} />
            <span className='font-bold text-[14px]'>
              {feed.writer_name}님께서 보낸 편지
            </span>
          </div>
        ) : (
          <div className='flex user gap-[10px] items-center'>
            <CircleImg imgUrl={feed.writer_image || DefaultProfile} size={30} />
            <span className='font-bold text-[14px]'>{feed.writer_name}</span>
          </div>
        )}

        {feed.is_mine && (
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <ShowMore />
              </button>
            </PopoverTrigger>
            <PopoverContent className='absolute p-4 -right-8 w-40 text-center'>
              <button onClick={() => handleDelete(feed.feed_id)}>
                삭제하기
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent>
          {feed.contents.map((image) => (
            <CarouselItem key={feed.feed_id + image.url}>
              {image.url && image.content_type === 'IMAGE' ? (
                <div className='relative w-full aspect-square'>
                  <Image
                    src={image.url}
                    alt={image.url}
                    fill
                    className='object-cover'
                  />
                </div>
              ) : (
                <div className='relative w-full aspect-square'>
                  <ReactPlayer
                    url={videoLoaderUrl(image.url)}
                    width='100%'
                    height='100%'
                    controls={true}
                    playing={false}
                    muted={true}
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex justify-between px-[16px] items-center'>
        <div className='flex  gap-2'>
          <div
            className={`flex gap-1 cursor-pointer ${isLikeAnimating ? 'animate-like' : ''}`}
            onClick={() => handleLike(feed.feed_id)}
          >
            {feed.like > 0 ? <LikeOn /> : <LikeOff />}
            <span
              className={`text-[13px] ${feed.like > 0 ? 'text-appColor' : 'text-placeHolder'}`}
            >
              {feed.like}
            </span>
          </div>
          <div
            className='flex gap-1 cursor-pointer'
            onClick={() => setOpen(true)}
          >
            {feed.comments.length > 0 ? <CommentOn /> : <CommentOff />}
            <span
              className={`text-[13px] ${feed.comments.length > 0 ? 'text-appColor' : 'text-placeHolder'}`}
            >
              {feed.comments.length}
            </span>
          </div>
          <CommentDrawer
            open={open}
            onOpenChange={setOpen}
            feedId={feed.feed_id}
            comments={feed.comments}
          />
        </div>
        <span className='font-semibold text-[14px]'>
          {new Date(feed.created_at).toLocaleDateString('KO-KR')}
        </span>
      </div>

      <span className='px-[16px] whitespace-break-spaces font-semibold'>
        {feed.message}
      </span>
    </div>
  );
};

export default FeedCard;
