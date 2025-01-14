import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  padding?: string;
} & HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'p-[15px 20px]', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-2xl bg-white shadow-[0px_2px_8px_0px_rgba(136,137,157,0.30)]',
        padding,
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };
