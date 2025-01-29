import UserCheckBox from '@/components/atoms/CheckBoxes/UserCheckBox';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CheckBoxes/UserCheckBox',
  component: UserCheckBox,
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
} satisfies Meta<typeof UserCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: {
    checked: false,
    onChange: (checked: boolean) =>
      console.log('User checkbox changed:', checked),
  },
};
