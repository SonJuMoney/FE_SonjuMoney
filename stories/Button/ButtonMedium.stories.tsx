import { ButtonMedium } from '@/components/atoms/Buttons/ButtonMedium';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonMedium> = {
  title: 'Components/Button/ButtonMedium',
  component: ButtonMedium,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Medium: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '10만원',
    className:
      'flex justify-center items-center w-full p-[11px] rounded-lg font-semibold',
    selected: false,
  },
};

export default meta;
