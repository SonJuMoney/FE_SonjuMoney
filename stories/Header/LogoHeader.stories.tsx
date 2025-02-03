import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

const queryClient = new QueryClient();

const meta: Meta<typeof LogoHeader> = {
  title: 'Components/Header/LogoHeader',
  component: LogoHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SessionProvider session={null}>
        <QueryClientProvider client={queryClient}>
          <AppRouterContext.Provider value={{} as AppRouterInstance}>
            <Story />
          </AppRouterContext.Provider>
        </QueryClientProvider>
      </SessionProvider>
    ),
  ],
  argTypes: {
    showFamily: { control: 'boolean' },
  },
};

export const Default: StoryObj<typeof meta> = {
  args: {
    showFamily: false,
  },
};

export default meta;
