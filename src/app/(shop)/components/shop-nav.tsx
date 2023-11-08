'use client';
import { Cart } from '@/components/cart';
import { Notification } from '@/components/notification';
import { cn } from '@/lib/utils';
import { Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import ShopNavMobile from './shop-nav-mobile';
export const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt:
            'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};
const ShopNav = () => {
  return (
    <>
      <header className='relative bg-white shadow-sm '>
        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8   flex h-16 items-center justify-between'
        >
          {/* Logo (lg+) */}
          <div className='hidden lg:flex lg:flex-1 lg:items-center'>
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

          {/* Flyout menus */}
          <div className='hidden h-full lg:flex'>
            <Popover.Group className='inset-x-0 bottom-0 px-4 z-50'>
              <div className='flex h-full justify-center space-x-8'>
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className='flex'>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={cn(
                            open
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-800',
                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none'
                          )}
                        >
                          {category.name}
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-200'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='transition ease-in duration-150'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Popover.Panel className='absolute inset-x-0 top-full bg-white text-sm text-gray-500'>
                            <div className='mx-auto max-w-7xl px-8 relative shadow-md pb-5 rounded-b-md'>
                              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16 min-h-[400px] mb-5'>
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className='group relative h-full w-full'
                                  >
                                    <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75 relative h-full w-full'>
                                      <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        fill
                                        className='object-cover object-center'
                                      />
                                    </div>
                                    <Link
                                      href={item.href}
                                      className='mt-4 block font-medium text-gray-900'
                                    >
                                      <span
                                        className='absolute inset-0 z-10'
                                        aria-hidden='true'
                                      />
                                      {item.name}
                                    </Link>
                                    <p aria-hidden='true' className='mt-1'>
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}
              </div>
            </Popover.Group>
          </div>

          {/* Mobile menu and search (lg-) */}
          <div className='flex flex-1 items-center lg:hidden'>
            <ShopNavMobile />

            {/* Search */}
            <div className='ml-2 p-2 text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>Search</span>
              <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
            </div>
          </div>

          {/* Logo (lg-) */}
          <Link href='/' className='flex items-center lg:hidden'>
            <div className='relative overflow-hidden h-12 w-12'>
              <Image
                src={'/images/logo/hianne.svg'}
                alt='HiAnne'
                fill
                className='object-contain transition-all aspect-square'
              />
            </div>
          </Link>

          {/* Notification & Cart */}
          <div className='flex flex-1 items-center justify-end'>
            <Notification />
            <Cart />
          </div>
        </nav>
      </header>
    </>
  );
};

export default ShopNav;
