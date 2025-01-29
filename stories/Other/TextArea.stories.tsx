import TextArea from '@/components/atoms/TextArea/TextArea';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    errorMsg: { control: 'text' },
    maxLength: { control: 'number' },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    placeholder: '자유롭게 마음을 전달해보세요 (300자 이내)',
    error: false,
    errorMsg: '',
    maxLength: 300,
  },
};

export const Error: StoryObj<typeof meta> = {
  args: {
    placeholder: '자유롭게 마음을 전달해보세요 (300자 이내)',
    error: true,
    errorMsg: '텍스트를 입력해주세요',
    maxLength: 300,
  },
};

export default meta;
