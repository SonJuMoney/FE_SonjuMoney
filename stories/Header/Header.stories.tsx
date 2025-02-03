import Header from '@/components/atoms/Headers/Header';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

const meta: Meta<typeof Header> = {
  title: 'Components/Header/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={{} as AppRouterInstance}>
        <Story />
      </AppRouterContext.Provider>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    showBackButton: { control: 'boolean' },
    actionButton: {
      control: 'object',
      description: 'Action button with label and onClick handler',
    },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    title: '회원가입 ',
    showBackButton: true,
    actionButton: {
      label: '건너뛰기',
      onClick: () => console.log('Action clicked'),
    },
  },
};

export const WithoutBackButton: StoryObj<typeof meta> = {
  args: {
    title: '회원가입',
    showBackButton: false,
  },
};

export default meta;
