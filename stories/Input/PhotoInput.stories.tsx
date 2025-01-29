import PhotoInput from '@/components/atoms/Inputs/PhotoInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PhotoInput> = {
  title: 'Components/Input/PhotoInput',
  component: PhotoInput,
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number' },
    onClick: { action: 'clicked' },
  },
};

export const Max1Photo: StoryObj<typeof meta> = {
  args: { maxLength: 1 },
};

export const Max5Photos: StoryObj<typeof meta> = {
  args: { maxLength: 5 },
};
export default meta;
