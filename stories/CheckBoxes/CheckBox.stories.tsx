import CheckBox from '@/components/atoms/CheckBoxes/CheckBox';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CheckBoxes/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Check: Story = {
  args: {
    checked: false,
    onChange: (checked: boolean) => console.log('Checkbox changed:', checked),
  },
};
