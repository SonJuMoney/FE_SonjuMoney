import PriceInput from '@/components/atoms/Inputs/PriceInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PriceInput> = {
  title: 'Components/Input/PriceInput',
  component: PriceInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    balance: { control: 'number' },
    limitAmount: { control: 'number' },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    value: '',
    balance: 1000000,
    limitAmount: 500000,
  },
};

export const Price: StoryObj<typeof meta> = {
  args: {
    value: '100000',
    balance: 1000000,
    limitAmount: 500000,
  },
};

export default meta;
