// RegisterCard.stories.tsx
import RegisterCard from '@/components/atoms/Cards/RegisterCardSmall';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Cards/RegisterCardSmall',
  component: RegisterCard,
  argTypes: {
    text: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof RegisterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RegisterSmall: Story = {
  args: {
    text: '내 자녀 계정 추가하기',
  },
};
