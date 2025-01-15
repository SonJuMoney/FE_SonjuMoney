// DynamicInput.tsx
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type DynamicInputProps = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  minWidth?: string;
  className?: string;
};

const DynamicInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyDown,
  minWidth = '15ch',
  className = '',
}: DynamicInputProps) => {
  const [localValue, setLocalValue] = useState('');

  const currentValue = value ?? localValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <input
      autoFocus
      type={type}
      value={currentValue}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`${className}`}
      style={{
        width: `${Math.max(currentValue.length + 1)}ch`,
        minWidth: minWidth,
      }}
    />
  );
};

export default DynamicInput;
