import BankCheckBox from '@/components/atoms/CheckBoxes/BankCheckBox';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CheckBoxes/BankCheckBox',
  component: BankCheckBox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크박스 선택 상태',
    },
    onChange: {
      action: 'changed',
      description: '체크박스 상태 변경 핸들러',
    },
  },
} satisfies Meta<typeof BankCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bank: Story = {
  args: {
    checked: false,
    onChange: (checked: boolean) =>
      console.log('Bank checkbox changed:', checked),
  },
};
