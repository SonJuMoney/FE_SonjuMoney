import { LabelInput } from '@/components/atoms/Inputs/LabelInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LabelInput> = {
  title: 'Components/Input/LabelInput',
  component: LabelInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Label' },
    error: { control: 'text' },
    placeholder: { control: 'text', defaultValue: 'Enter text...' },
  },
};

export const Label: StoryObj<typeof meta> = {
  args: {
    label: '아이디',
    placeholder: '아이디를 입력하세요',
  },
};

export const Error: StoryObj<typeof meta> = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    error: '비밀번호가 일치하지 않아요',
  },
};

export default meta;
