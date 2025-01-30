import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import CommentInput from '@/components/atoms/Inputs/CommentInput';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useFeedApi } from '@/hooks/useFeedApi/useFeedApi';
import DefaultProfile from '@/public/Avatar/Default_Profile.svg';
import ShowMore from '@/public/Icons/showMore_24.svg';
import { TComment } from '@/types/Feed';
import { formatUpdatedAt } from '@/lib/utils';

interface CommentDrawerProps {
  open: boolean;
  feedId: number;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  comments: TComment[];
}

const CommentDrawer = ({
  open,
  onOpenChange,
  feedId,
  comments,
}: CommentDrawerProps) => {
  const { deleteComment } = useFeedApi();
  const { toast } = useToast();

  const handleDeleteComment = (comment_id: number) => {
    deleteComment(comment_id, {
      onSuccess: () => {
        toast({
          description: '댓글이 삭제되었습니다.',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          description: '댓글 삭제에 실패했습니다.',
        });
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='flex flex-col max-h-[500px]'>
        <DrawerHeader>
          <DrawerTitle>댓글</DrawerTitle>
        </DrawerHeader>
        <div className='flex h-full flex-col'>
          <div className='flex flex-col space-y-4 max-h-[500px] w-full overflow-y-auto p-4'>
            {comments.length ? (
              <>
                {comments.map((comment, index) => (
                  <div key={index} className='flex w-full justify-between'>
                    <div className='flex items-start gap-2'>
                      <CircleImg
                        imgUrl={comment.writer_image || DefaultProfile}
                        size={45}
                      />
                      <div>
                        <div className='flex gap-2 items-center'>
                          <span className='font-bold text-md'>
                            {comment.writer_name}
                          </span>
                          <span className='text-[11px] text-appColor'>
                            {formatUpdatedAt(comment.created_at)}
                          </span>
                        </div>
                        <p className='text-lg'>{comment.message}</p>
                      </div>
                    </div>
                    {comment.is_mine && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button>
                            <ShowMore />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className='absolute p-4 -right-6 w-28 text-center'>
                          <button
                            onClick={() =>
                              handleDeleteComment(comment.comment_id)
                            }
                          >
                            삭제하기
                          </button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <span className='flex w-full items-center justify-center text-darkGray text-[16px]'>
                아직 댓글이 없어요. 처음으로 댓글을 남겨주세요!
              </span>
            )}
          </div>
          <div className='flex gap-2 sticky bottom-0 bg-white  border-t'>
            <CommentInput feed_id={feedId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
