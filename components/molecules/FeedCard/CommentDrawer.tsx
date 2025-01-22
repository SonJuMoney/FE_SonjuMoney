import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import CommentInput from '@/components/atoms/Inputs/CommentInput';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { TComment } from '@/types/Feed';

interface CommentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comments: TComment[];
}

const CommentDrawer = ({
  open,
  onOpenChange,
  comments,
}: CommentDrawerProps) => {
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
                  <div key={index} className='flex items-start gap-2'>
                    <CircleImg
                      imgUrl={comment.writer_image || '/Role1.png'}
                      size={24}
                    />
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
          <div className='flex gap-2 sticky bottom-0 bg-white  border-t'>
            <CommentInput onSubmit={() => {}} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
