import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Cards/RegisterCard',
  component: RegisterCard,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof RegisterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Register: Story = {
  args: {
    text: '내 계좌 연결하기',
  },
};
