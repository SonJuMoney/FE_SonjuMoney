import BottomNav from '@/components/atoms/BottomNav/BottomNav';
import AuthSession from '@/context/user/AuthSession';
import { getServerSession } from 'next-auth';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { authOptions } from '@/lib/auth';
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
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body
        className={`font-pretendard ${pretendard.variable} antialiased text-black`}
      >
        <AuthSession session={session}>
          {children}
          <BottomNav />
        </AuthSession>
      </body>
    </html>
  );
}
