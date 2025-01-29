import { Card } from '@/components/atoms/Cards/Card';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Components/Cards/Card',
  component: Card,
  argTypes: {
    padding: { control: 'text' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export const WhiteCard: StoryObj<typeof meta> = {
  args: {
    children: <div>카드 내용</div>,
    padding: 'p-[20px]',
    className: '',
  },
};

export default meta;
