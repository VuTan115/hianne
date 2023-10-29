import { Comfortaa, Pacifico, Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';


export const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['vietnamese'],
  display: 'swap',
  fallback: ['sans-serif'],
  variable: '--opensans',
  preload: true,
});

export const Siracha = localFont({
  src: '../../public/fonts/Sriracha-Regular.woff2',
  display: 'swap',
  variable: '--siracha',
});
