import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        appColor: '#FF9100',
        secondary: '#F8B62D',
        black: '#212529',
        placeHolder: '#B9B9B9',
        disabled: '#DEDEDE',
        white: '#FFFFFF',
        darkGray: '#555555',
        error: '#EA4335',
        lavendar: '#D3B1FF',
        lemon: '#FCF094',
        skyBlue: '#BEE1F0',
        peach: '#F5C2C2',
        brown: '#C6A284',
        pink: '#FF8086',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
