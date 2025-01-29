import ToastMessage from '@/components/atoms/Toast/ToastMessage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToastMessage> = {
  title: 'Components/Toast/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
};

export const Message: StoryObj<typeof meta> = {
  args: {
    message: 'Toast Message',
  },
};

export default meta;
