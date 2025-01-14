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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LoveLetter from '@/public/AnimatedIcons/LoveLetter.png';
import CommentOff from '@/public/Icons/commentOff_20.svg';
import CommentOn from '@/public/Icons/commentOn_20.svg';
import LikeOff from '@/public/Icons/likeOff_20.svg';
import LikeOn from '@/public/Icons/likeOn_20.svg';
import ShowMore from '@/public/Icons/showMore_24.svg';
import { TFeed } from '@/types/Feed';
import Image from 'next/image';

const FeedCard = ({ feed }: { feed: TFeed }) => {
  return (
    <Card className='flex flex-col w-full gap-[10px] py-[16px]'>
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
            <CircleImg imgUrl={feed.writer_image} size={30} />
            <span className='font-bold text-[14px]'>{feed.writer_name}</span>
          </div>
        )}

        {feed.isMine && (
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <ShowMore />
              </button>
            </PopoverTrigger>
            <PopoverContent className='absolute p-4 -right-8 w-40 text-center'>
              <button>삭제하기</button>
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
            <CarouselItem key={image.url}>
              {image.type === 'IMAGE' ? (
                <div className='relative w-full aspect-square'>
                  <Image src={image.url} alt='' fill className='object-cover' />
                </div>
              ) : (
                <div className='relative w-full aspect-square '>
                  <iframe
                    src={image.url}
                    allowFullScreen
                    className='w-full h-full'
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
            <DrawerContent className='flex flex-col max-h-[500px]'>
              <DrawerHeader>
                <DrawerTitle>댓글</DrawerTitle>
              </DrawerHeader>
              <div className='flex h-full flex-col'>
                {/* 기존 댓글 목록 */}
                <div className='flex flex-col space-y-4 max-h-[500px]  w-full overflow-y-scroll p-4'>
                  {feed.comments.length ? (
                    <>
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
                    </>
                  ) : (
                    <span className='flex w-full items-center justify-center text-darkGray text-[16px]'>
                      아직 댓글이 없어요. 처음으로 댓글을 남겨주세요!
                    </span>
                  )}
                </div>
                {/* 댓글 입력 영역 */}
                <div className='flex gap-2'>
                  <CommentInput onSubmit={() => {}} />
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
