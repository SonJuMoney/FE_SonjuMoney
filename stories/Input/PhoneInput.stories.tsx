import PhoneInput from '@/components/atoms/Inputs/PhoneInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/Input/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    value: '',
  },
};

export const Phone: StoryObj<typeof meta> = {
  args: {
    value: '01012345678',
  },
};

export default meta;
