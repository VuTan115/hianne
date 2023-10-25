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
        name: 'MAC Cosmetics',
      },
      {
        name: 'Maybelline New York',
      },
      {
        name: "L'Oréal Paris",
      },
      {
        name: 'Chanel',
      },
      {
        name: 'Dior',
      },
      {
        name: 'NARS',
      },
      {
        name: 'NYX Professional Makeup',
      },
      {
        name: 'Huda Beauty',
      },
      {
        name: 'Urban Decay',
      },
      {
        name: 'Fenty Beauty by Rihanna',
      },
    ],
  },
  {
    name: 'Phấn',
    url: '/',

    subs: [
      {
        name: 'Phấn má',
        url: '',
        subs: [
          {
            name: 'Maybelline New York',
          },
          {
            name: 'Fenty Beauty by Rihanna',
          },
          {
            name: 'Urban Decay',
          },
          {
            name: 'Make Up For Ever',
          },
          {
            name: 'NYX Professional Makeup',
          },
          {
            name: 'Laura Mercier',
          },
          {
            name: 'Huda Beauty',
          },
        ],
      },
      {
        name: 'Phấn má',
        url: '',
        subs: [
          {
            name: 'NARS',
          },
          {
            name: 'MAC Cosmetics',
          },
          {
            name: 'Benefit Cosmetics',
          },
          {
            name: 'Tarte Cosmetics',
          },
          {
            name: 'Clinique',
          },
          {
            name: 'Bobbi Brown',
          },
          {
            name: 'Too Faced',
          },
          {
            name: 'Milani',
          },
        ],
      },
      {
        name: 'Phấn phủ',
        url: '',
        subs: [
          {
            name: 'NARS',
          },
          {
            name: 'MAC Cosmetics',
          },
          {
            name: 'Benefit Cosmetics',
          },
          {
            name: 'Tarte Cosmetics',
          },
          {
            name: 'Clinique',
          },
          {
            name: 'Bobbi Brown',
          },
          {
            name: 'Too Faced',
          },
          {
            name: 'Milani',
          },
        ],
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
    <div className='mr-4 hidden md:flex md:flex-1'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        {/* <Image alt='' width={48} height={48} className='rounded-sm shadow-md' /> */}
        <div className='relative overflow-hidden h-12 w-12'>
          <Image
            src={'/images/logo/hianne.svg'}
            alt='HiAnne'
            fill
            className='object-contain transition-all aspect-square'
          />
        </div>
      </Link>
      <nav className='flex  items-center space-x-6 text-sm font-medium w-full flex-shrink-0'>
        <div className='relative text-base text-black/60 group/nav cursor-pointer overflow-visible'>
          <div className='flex gap-3 items-center justify-between'>
            <span>Sản phẩm</span>
            <ChevronDownIcon className='mb-1 group-hover/nav:-rotate-180 transition-all duration-200' />
          </div>
          <div className='hidden group-hover/nav:grid grid-cols-3  container w-full min-w-[70vw] bg-white absolute rounded-md shadow-lg  min-h-[60vh] max-w-3xl -z-0 pt-4 pb-5'>
            <div className='bg-white col-span-1 h-full space-y-2'>
              {navItems.map((item, idx) => (
                <NavItem key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const NavItem = (item: NavItemProps) => {
  return (
    <li
      className={cn(
        'flex items-center justify-between gap-4  pl-5 relative hover:bg-black/5 group  right-0 transition-all bg-white overflow-visible  w-full min-w-fit text-black'
      )}
    >
      <div className='peer flex gap-3 items-center justify-between whitespace-nowrap w-full min-w-fit h-full min-h-fit  py-1'>
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
