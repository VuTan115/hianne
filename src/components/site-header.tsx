import { Cart } from '@/components/cart';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { Notification } from '@/components/notification';
import { CommandMenu } from './command-menu';

export function SiteHeader() {
  return (
    <header className='supports-backdrop-blur:bg-background/60 w-full bg-background/95 backdrop-blur flex h-[var(--nav-h)] items-center px-3 md:px-10 z-10'>
      <MainNav />
      <MobileNav />
      <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
        <div className='w-full flex-1 md:w-auto md:flex-none'>
          {/* <CommandMenu /> */}
        </div>
        <nav className='flex items-center'>
          <Notification />
          <Cart />
        </nav>
      </div>
    </header>
  );
}
