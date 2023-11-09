'use client';

import ProductQuantity from '@/app/(shop)/products/components/product-quantity';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import useCartStore from '@/store/cart';
import { currencyFormatter } from '@/utils/number-formater';
import { createUrl } from '@/utils/url-handler';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FullWidthButton from '../full-width-button';
export function Cart() {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, clearCart, updateCart } = useCartStore();
  const closeCart = () => setOpen(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='p-2 text-base hover:bg-black/10 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 relative'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                fill='#0009'
                d='M17.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
              ></path>
              <path
                stroke='#0009'
                strokeLinecap='round'
                strokeMiterlimit='10'
                strokeWidth='1.5'
                d='M19.25 17.25H6.71c-.12 0-.22-.09-.25-.2L3.79 2.96a.248.248 0 00-.25-.2H1.75'
              ></path>
              <path
                stroke='#0009'
                strokeLinecap='round'
                strokeMiterlimit='10'
                strokeWidth='1.5'
                d='M6.25 13.25h13.78c.13 0 .23-.09.25-.22l.93-7a.25.25 0 00-.25-.28H5'
              ></path>
            </svg>
            <span className='text-white text-xs text-[11px] bg-red-400 rounded-full absolute top-0 right-0 h-[17px] w-[17px]'>
              {cart.items.length}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side='right'
          className='pr-5 pb-10 bg-white flex flex-col justify-between outline-none w-full sm:min-w-[500px]'
        >
          <span className='font-bold'>Giỏ hàng của bạn</span>
          <ScrollArea className='my-4 flex-1 pr-3 -mr-3'>
            <ul
              role='list'
              className='divide-y divide-gray-100 overflow-x-visible'
            >
              {!cart || cart.items.length === 0 ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <ShoppingCartIcon className='h-16' />
                  <p className='mt-6 text-center text-2xl font-bold'>
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                  <ul className='flex-grow overflow-auto py-4'>
                    {cart.items.map((item, i) => {
                      const merchandiseSearchParams = {
                        category: item.category,
                      } as {
                        [key: string]: string;
                      };
                      const merchandiseUrl = createUrl(
                        `/products/${item.slug}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );
                      return (
                        <li
                          key={i}
                          className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'
                        >
                          <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                            <div className='absolute z-40 -mt-2 ml-[55px]'>
                              <button
                                type='button'
                                onClick={(
                                  e: React.FormEvent<HTMLButtonElement>
                                ) => {
                                  removeFromCart(item.code);
                                }}
                                aria-label='Remove cart item'
                                className={cn(
                                  'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200'
                                )}
                              >
                                <XMarkIcon className='hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black' />
                              </button>
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className='z-30 flex flex-row space-x-4'
                            >
                              <div className='relative h-16 w-16 block cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                                <Image
                                  className='h-full w-full object-cover'
                                  width={64}
                                  height={64}
                                  alt={item.name}
                                  src={item.thumbnail}
                                />
                              </div>
                              <div className='flex flex-1 flex-col text-base'>
                                <span className='leading-tight'>
                                  {item.name}
                                </span>
                                <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                                  {item.code}
                                </p>
                              </div>
                            </Link>
                            <div className='flex h-16 flex-col justify-between'>
                              <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                                {item.price}
                              </p>
                              <div className='ml-auto flex h-9 flex-row items-center '>
                                <ProductQuantity
                                  quantity={item.quantity}
                                  onMinus={(val) => {
                                    console.log(val);
                                    updateCart(item.code, {
                                      quantity: item.quantity - 1,
                                    });
                                  }}
                                  onPlus={(val) => {
                                    updateCart(item.code, {
                                      quantity: item.quantity + 1,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </ul>
          </ScrollArea>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' disabled={cart.items.length < 1}>
                Xóa tất cả
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn xóa toàn bộ sản phẩm?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Toàn bộ sản phẩm sẽ bị xóa và không thể khôi phục!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearCart();
                  }}
                  className='text-white bg-red-600  hover:bg-red-700'
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className=' text-sm text-neutral-500 dark:text-neutral-400'>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
              <p>Phí ship</p>
              <p className='text-right'>Tính lúc thanh toán</p>
            </div>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
              <p>Tổng cộng</p>
              <span className='font-bold text-xl text-black'>
                {currencyFormatter.format(cart.total ?? 0)}
              </span>
            </div>
          </div>

          <FullWidthButton
            type='button'
            onClick={() => {
              setOpen(false);
              cart.items.length >= 1 && push('/checkout');
            }}
            className='relative min-h-0'
          >
            {cart.items.length < 1 ? 'Thêm sản phẩm' : '  Đặt hàng'}
          </FullWidthButton>
        </SheetContent>
      </Sheet>
    </div>
  );
}
