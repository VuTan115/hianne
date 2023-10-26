import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster as DefaultToaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { openSans } from './fonts';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans',
          openSans.className
        )}
      >
        <main className='min-h-screen flex flex-col'>{children}</main>
        <TailwindIndicator />
        <DefaultToaster />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Hi Anne',
    'Son môi',
    'Son 3CE',
    'Skin care',
    'Shop mỹ phẩm Hi Anne',
  ],
  authors: [
    {
      name: 'Hi Anne',
      url: siteConfig.url,
    },
  ],
  creator: 'Hi Anne',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],

  // openGraph: {
  //   type: 'website',
  //   locale: 'vi_VN',
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   // images: [
  //   //   {
  //   //     url: siteConfig.ogImage,
  //   //     width: 1200,
  //   //     height: 630,
  //   //     alt: siteConfig.name,
  //   //   },
  //   // ],
  // },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};
