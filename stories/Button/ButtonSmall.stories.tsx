import { ButtonSmall } from '@/components/atoms/Buttons/ButtonSmall';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonSmall> = {
  title: 'Components/Button/ButtonSmall',
  component: ButtonSmall,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Small: StoryObj<typeof meta> = {
  args: {
    type: 'button',
    text: '가족 등록하러가기',
    className:
      'flex justify-center items-center px-[12px] py-[6px] rounded-lg text-[15px] font-semibold',
    active: true,
  },
};

export default meta;
