'use client';

import * as React from 'react';
import { forwardRef, memo } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = {
  label: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type LabelInputRef = {
  value: string;
  focus: () => void;
};

const LabelInput = memo(
  forwardRef<LabelInputRef, InputProps>(
    (
      { className, label, error, wrapperClassName, id, onChange, ...props },
      ref
    ) => {
      const [isFocused, setIsFocused] = React.useState(false);
      const [value, setValue] = React.useState(
        (props.defaultValue as string) || ''
      );
      const inputId = id;
      const inputRef = React.useRef<HTMLInputElement>(null);

      React.useImperativeHandle(ref, () => ({
        value,
        focus: () => inputRef.current?.focus(),
      }));

      const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          onChange?.(e);
        },
        [onChange]
      );

      return (
        <div className={cn('space-y-2', wrapperClassName)}>
          <label
            htmlFor={inputId}
            className={cn(
              'block font-semibold transition-colors text-sm',
              isFocused ? 'text-primary' : 'text-foreground',
              error && 'text-destructive'
            )}
          >
            {label}
          </label>
          <input
            id={inputId}
            className={cn(
              'flex h-10 w-full rounded-none border-b bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeHolder focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              isFocused ? 'border-primary' : 'border-input',
              error && 'border-destructive text-destructive',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            value={value}
            ref={inputRef}
            {...props}
          />
          {error && (
            <p className='text-xs text-error' id={`${inputId}-error`}>
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);
LabelInput.displayName = 'LabelInput';

export { LabelInput };
