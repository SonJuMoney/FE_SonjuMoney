import BottomNav from '@/components/atoms/BottomNav/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { NotificationProvider } from '@/providers/SocketProvider';
import StreamVideoProvider from '@/providers/StreamClientProvider';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { auth } from '@/lib/auth';
import QueryProviders from './QueryProviders';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '손주머니',
  description: '가족 소통의 시작, 손주머니',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body
        className={`font-pretendard ${pretendard.variable} antialiased text-black`}
      >
        <QueryProviders>
          <SessionProvider session={session}>
            <NotificationProvider>
              <StreamVideoProvider>
                {children}
                <Toaster />
                <BottomNav />
              </StreamVideoProvider>
            </NotificationProvider>
          </SessionProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
