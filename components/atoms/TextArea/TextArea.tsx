'use client';

import DeleteIcon from '@/public/Icons/delete_24.svg';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type TextAreaProps = {
  defaultValue?: string;
  placeholder?: string;
  error?: boolean;
  errorMsg?: string;
  maxLength?: number;
  className?: string;
  onValueChange?: (value: string) => void;
};

export type TextAreaRef = {
  getValue: () => string;
  setValue: (value: string) => void;
  clear: () => void;
  focus: () => void;
  blur: () => void;
};

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      defaultValue = '',
      placeholder = '자유롭게 마음을 전달해보세요 (300자 이내)',
      error = false,
      errorMsg,
      maxLength = 300,
      className,
      onValueChange,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const valueRef = useRef(defaultValue);
    // 삭제 버튼 표시를 위한 상태만 useState로 관리
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => valueRef.current,
        setValue: (newValue: string) => {
          valueRef.current = newValue;
          if (textareaRef.current) {
            textareaRef.current.value = newValue;
          }
          setShowDeleteButton(
            !!newValue && textareaRef.current === document.activeElement
          );
          onValueChange?.(newValue);
        },
        clear: () => {
          valueRef.current = '';
          if (textareaRef.current) {
            textareaRef.current.value = '';
          }
          setShowDeleteButton(false);
          onValueChange?.('');
        },
        focus: () => textareaRef.current?.focus(),
        blur: () => textareaRef.current?.blur(),
      }),
      [onValueChange]
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        valueRef.current = event.target.value;
        setShowDeleteButton(!!event.target.value);
        onValueChange?.(event.target.value);
      },
      [onValueChange]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        valueRef.current = '';
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }
        setShowDeleteButton(false);
        onValueChange?.('');
        textareaRef.current?.focus();
      },
      [onValueChange]
    );

    const handleFocus = useCallback(() => {
      setShowDeleteButton(!!valueRef.current);
      textareaRef.current?.parentElement?.classList.add('border-black');
    }, []);

    const handleBlur = useCallback(() => {
      setShowDeleteButton(false);
      textareaRef.current?.parentElement?.classList.remove('border-black');
    }, []);

    return (
      <div className='flex flex-col w-full'>
        <div
          className={cn(
            'relative flex justify-between bg-white rounded-lg border border-gray-200 p-4 transition-colors',
            error && 'border-red-500',
            className
          )}
        >
          <textarea
            ref={textareaRef}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            name='message'
            className={cn(
              'w-full h-[188px] text-[17px] leading-[25px] font-normal',
              'resize-none outline-none',
              'placeholder:text-gray-500',
              'scrollbar-hide'
            )}
          />
          {showDeleteButton && (
            <button
              onClick={handleDelete}
              onMouseDown={handleDelete}
              onTouchStart={handleDelete}
              className='flex ml-2.5 flex-shrink-0'
              aria-label='Clear text'
            >
              <DeleteIcon className='w-6 h-6' />
            </button>
          )}
        </div>
        {error && errorMsg && (
          <p className='mt-1 text-sm text-red-500'>{errorMsg}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

// 사용법
// const textAreaRef = useRef<TextAreaRef>(null);
// <TextArea ref={textAreaRef} maxLength={300} />
