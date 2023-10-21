import { Comfortaa, Pacifico } from 'next/font/google';
import localFont from 'next/font/local';

export const pacificoFont = Pacifico({
  weight: ['400'],
  subsets: ['cyrillic', 'vietnamese'],
  variable: '--pacifico',
});

export const comfortaa = Comfortaa({
  weight: ['400', '600', '700'],
  subsets: ['vietnamese'],
  display: 'swap',
  fallback: ['sans-serif'],
  variable: '--comfortaa',
  preload: true,
});

export const Siracha = localFont({
  src: '../../public/fonts/Sriracha-Regular.woff2',
  display: 'swap',
  variable: '--siracha',
});
