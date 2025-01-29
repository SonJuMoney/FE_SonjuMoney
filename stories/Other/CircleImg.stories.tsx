import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import grandpa from '@/public/Avatar/grandpa.png';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CircleImg> = {
  title: 'Components/CircleImage/CircleImg',
  component: CircleImg,
  tags: ['autodocs'],
  argTypes: {
    imgUrl: { control: 'text' },
    size: { control: 'number' },
    border: { control: 'boolean' },
  },
};

export const Profile: StoryObj<typeof meta> = {
  args: {
    imgUrl: grandpa.src,
    size: 150,
    border: true,
  },
};

export default meta;
