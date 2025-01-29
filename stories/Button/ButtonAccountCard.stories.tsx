import { ButtonAccountCard } from '@/components/atoms/Buttons/ButtonAccountCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonAccountCard> = {
  title: 'Components/Button/ButtonAccountCard',
  component: ButtonAccountCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export const AccountCard: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '용돈 보내기',
    className:
      'flex justify-center items-center w-full h-10 p-4 rounded-lg text-[15px] font-semibold bg-[#eff0f4]',
  },
};

export default meta;
