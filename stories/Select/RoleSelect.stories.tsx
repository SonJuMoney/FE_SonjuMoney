import RoleSelect from '@/components/atoms/Selects/RoleSelect';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RoleSelect> = {
  title: 'Components/Select/RoleSelect',
  component: RoleSelect,
  argTypes: {
    value: {
      control: 'select',
      options: ['할아버지', '할머니', '아빠', '엄마', '아들', '딸'],
    },
    onChange: { action: 'changed' },
  },
};

export const Role: StoryObj<typeof meta> = {
  args: {
    value: '',
  },
};

export default meta;
