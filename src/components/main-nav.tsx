'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
type NavItemProps = {
  name: string;
  url?: string;
  subs?: NavItemProps[];
};

const navItems: NavItemProps[] = [
  {
    name: 'Son',
    url: '/',
    subs: [
      {
        name: 'Son bóng',
      },
      {
        name: 'Son lì',
      },
      {
        name: 'Son dưỡng',
      },
    ],
  },
  { name: 'Mascara' },
  {
    name: 'Phấn',
    url: '/',

    subs: [
      {
        name: 'Phấn mắt',
        url: '',
      },

      {
        name: 'Phấn phủ',
        url: '',
      },
    ],
  },
  {
    name: 'Kẻ',
    subs: [
      { name: 'Mắt', url: '/' },
      { name: 'Chân mày', url: '/' },
      { name: 'Môi', url: '/' },
    ],
  },
  {
    name: 'Kem',
    subs: [
      { name: 'Kem nền' },
      { name: 'Kem chống nắng' },
      { name: 'Kem lót' },
    ],
  },
  { name: 'Kẹp mi' },
  { name: 'Khác' },
];
export function MainNav() {
  return (
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
      <nav className='flex items-center text-sm font-medium w-full flex-shrink-0 relative'>
        <div className='flex gap-3 items-center justify-between absolute cursor-pointer group/sp  peer/sp h-full'>
          <span>Sản phẩm</span>
          <ChevronDownIcon className='mb-1 group-hover/sp:-rotate-180 transition-all duration-200' />
        </div>
        <div className='hidden peer-hover/sp:grid hover:grid container w-full bg-transparent absolute rounded-md shadow-lg max-w-xl -z-0 pt-4 pb-5 top-full bg-white'>
          <div className='relative bg-white h-full space-y-2 w-fit'>
            {navItems.map((item, idx) => (
              <NavItem key={`${item.name}-${idx}`} {...item} />
            ))}
          </div>
        </div>
        {/* <div className='relative text-base text-black/60 group/nav cursor-pointer overflow-visible'></div> */}
      </nav>
    </div>
  );
}

const NavItem = (item: NavItemProps) => {
  return (
    <li
      className={cn(
        'flex items-center justify-between gap-4  pl-5 relative hover:bg-black/5 group  right-0 transition-all bg-white overflow-visible  w-full min-w-fit text-black mr-10 cursor-pointer'
      )}
    >
      <div className='peer flex gap-5 items-center justify-between whitespace-nowrap w-full min-w-fit h-full min-h-fit  py-1'>
        <span>{item.name}</span>
        {item.subs && item.subs.length > 0 && <ChevronRightIcon />}
      </div>
      {item.subs && item.subs.length > 0 && (
        <ul
          className={cn(
            'hidden hover:flex peer-hover:flex flex-col absolute left-full top-0 right-0 bg-white transition-all min-w-fit h-fit min-h-full w-full'
          )}
        >
          {item.subs.map((subItem) => (
            <NavItem key={subItem.name} {...subItem} />
          ))}
        </ul>
      )}
    </li>
  );
};
