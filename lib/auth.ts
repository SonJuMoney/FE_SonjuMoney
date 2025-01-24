import NextAuth from 'next-auth';
import 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import SocketManager from '@/lib/websocket';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    userName?: string;
    userProfile?: string;
    userGender?: string;
    userBirth?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    userName?: string;
    userProfile?: string;
    userGender?: string;
    userBirth?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        userId: { label: 'id', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                authId: credentials.userId,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error('spring 로그인 오류');
          }

          const data = await response.json();

          if (data?.access_token && data?.refresh_token) {
            if (typeof window !== 'undefined') {
              document.cookie = `accessToken=${data?.access_token}; path=/; secure; samesite=strict`;
            }
            SocketManager.getInstance();
            SocketManager.connect();
            return {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              userId: data.user_id,
              userName: data.user_name,
              userProfile: data.user_profile,
              userGender: data.gender,
              userBirth: data.bitrh,
            };
          }

          throw new Error('로그인 토큰 오류');
        } catch (error) {
          throw new Error('로그인 실패');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.userId;
        token.userName = user.userName;
        token.userProfile = user.userProfile;
        token.userGender = user.userGender;
        token.userBirth = user.userBirth;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.userId = token.userId;
      session.user.userName = token.userName;
      session.user.userProfile = token.userProfile;
      session.user.userGender = token.userGender;
      session.user.userBirth = token.userBirth;
      return session;
    },
  },
  events: {
    signOut: () => {
      SocketManager.disconnect();
    },
  },
});
