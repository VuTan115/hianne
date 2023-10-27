import { Cart } from '@/components/cart';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { Notification } from '@/components/notification';

export function SiteHeader() {
  return (
    <header className='w-full flex h-[var(--nav-h)] items-center px-3 md:px-10 z-10 absolute'>
      <MainNav />
      <MobileNav />
      <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
        <div className='w-full flex-1 md:w-auto md:flex-none'>
        </div>
        <nav className='flex items-center'>
          <Notification />
          <Cart />
        </nav>
      </div>
    </header>
  );
}
