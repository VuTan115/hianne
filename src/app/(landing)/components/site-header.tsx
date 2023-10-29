import { Cart } from '@/components/cart';
import { MobileNav } from '@/components/mobile-nav';
import { Notification } from '@/components/notification';
import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className='w-full flex h-[var(--nav-h)] items-center px-3 md:px-10 z-10 absolute'>
      <div className='hidden md:flex md:flex-1 gap-5'>
        <Link href='/' className='flex items-center'>
          <div className='relative overflow-hidden h-12 w-12'>
            <Image
              src={'/images/logo/hianne.svg'}
              alt='HiAnne'
              fill
              className='object-contain transition-all aspect-square'
            />
          </div>
        </Link>
      </div>
      <MobileNav />
      <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
        <div className='w-full flex-1 md:w-auto md:flex-none'></div>
        <nav className='flex items-center'>
          <Notification />
          <Cart />
        </nav>
      </div>
    </header>
  );
}
