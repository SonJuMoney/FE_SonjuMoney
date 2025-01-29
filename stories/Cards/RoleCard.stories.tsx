import RoleCard from '@/components/atoms/Cards/RoleCard';
import dadImage from '@/public/Avatar/dad.png';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Cards/RoleCard',
  component: RoleCard,
  tags: ['autodocs'],
  argTypes: {
    image: { control: 'text' },
    name: { control: 'text' },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof RoleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dad: Story = {
  args: {
    image: dadImage.src,
    name: '김아빠',
    selected: false,
    onClick: () => console.log('Role card clicked'),
  },
};
