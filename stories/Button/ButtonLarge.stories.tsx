import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonLarge> = {
  title: 'Components/Button/ButtonLarge',
  component: ButtonLarge,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Large: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '다음',
    className:
      'flex justify-center items-center w-full p-4 rounded-[14px] text-lg',
    disabled: false,
  },
};

export default meta;
