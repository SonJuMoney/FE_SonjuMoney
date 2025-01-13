'use client';

import CommentOff from '@/assets/Icons/commentOff_32.svg';
import CommentOn from '@/assets/Icons/commentOn_32.svg';
import { useCallback, useRef, useState } from 'react';

type CommentInputProps = {
  onSubmit?: (comment: string) => void;
};

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);

  const handleInput = useCallback(() => {
    setHasValue(!!inputRef.current?.value.trim());
  }, []);

  const handleSubmit = useCallback(() => {
    const input = inputRef.current;
    if (input && input.value.trim()) {
      onSubmit?.(input.value);
      input.value = '';
      setHasValue(false);
    }
  }, [onSubmit]);
  console.log('hi');

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white px-5 py-4  border-t border-gray-100'>
      <div className='flex items-center gap-[25px]'>
        <input
          ref={inputRef}
          onInput={handleInput}
          type='text'
          placeholder='댓글을 남겨주세요'
          className='w-full text-black placeholder-placeHolder focus:outline-none'
        />
        <button onClick={handleSubmit} className='focus:outline-none'>
          {hasValue ? (
            <CommentOn className='w-8 h-8 transition-all' />
          ) : (
            <CommentOff className='w-8 h-8 transition-all' />
          )}
        </button>
      </div>
    </div>
  );
}
