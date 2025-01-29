import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    password: { control: 'text' },
  },
};

export const Password: StoryObj<typeof meta> = {
  args: {
    password: '123456',
  },
};

export default meta;
