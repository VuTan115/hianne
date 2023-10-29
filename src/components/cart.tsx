'use client';

import ProductQuantity from '@/app/products/components/product-quantity';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useCart, { CartItem } from '@/hooks/use-cart';

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
import { currencyFormatter } from '@/utils/number-formater';
import Image from 'next/image';
import { useState } from 'react';
export function Cart() {
  const [open, setOpen] = useState(false);
  const {
    cart,
    calculateTotalPrice,
    removeFromCart,
    clearCart,
    updateCartItem,
  } = useCart();
  const handleMinusItem = (val: number, cartItem: CartItem) => {
    updateCartItem(cartItem.id, { quantity: val });
  };
  const handlePlusItem = (val: number, cartItem: CartItem) => {
    updateCartItem(cartItem.id, { quantity: val });
  };
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
              {cart.length}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side='right'
          className='pr-5 pb-10 bg-white flex flex-col justify-between outline-none md:min-w-[500px]'
        >
          <span className='font-bold'>Giỏ hàng của bạn</span>
          <ScrollArea className='my-4 flex-1 pr-3 -mr-3'>
            <ul
              role='list'
              className='divide-y divide-gray-100 overflow-x-visible'
            >
              {cart &&
                cart.map((item) => (
                  <li
                    key={item.code}
                    className='flex justify-between gap-x-4 py-5 group relative transition-all duration-150'
                  >
                    <div className='flex min-w-0 gap-x-4 flex-1 '>
                      <Image
                        className='h-12 w-12 flex-none rounded-md bg-gray-50'
                        src={item.thumbnail}
                        alt={item.name}
                        width={12}
                        height={12}
                      />
                      <div className='min-w-0 flex-auto'>
                        <p
                          className='text-sm font-semibold leading-6 text-gray-900 two-lines'
                          title={item.name}
                        >
                          {item.name}
                        </p>
                        <p className='mt-1 truncate text-sm leading-5 text-gray-500'>
                          Mã màu: {item.code}
                        </p>
                      </div>
                    </div>
                    <div className='hidden shrink-0 sm:flex sm:flex-col justify-between sm:items-end'>
                      <p className='text-sm leading-6 text-gray-900'>
                        {item.price}
                      </p>
                      <ProductQuantity
                        quantity={item.quantity}
                        onMinus={(val) => {
                          handleMinusItem(val, item);
                        }}
                        onPlus={(val) => {
                          handlePlusItem(val, item);
                        }}
                      />
                    </div>
                    <Button
                      variant='outline'
                      className='hidden sm:block h-fit m-auto p-1'
                      onClick={() => {
                        removeFromCart(item.code);
                      }}
                    >
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
                          fill='currentColor'
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </Button>
                  </li>
                ))}
            </ul>
          </ScrollArea>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' disabled={cart.length < 1}>
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
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className='flex justify-between items-center'>
            <span>Tổng cộng:</span>
            <span className='font-bold text-xl text-black'>
              {currencyFormatter.format(calculateTotalPrice())}
            </span>
          </div>
          <button
            type='button'
            className='flex max-w-xsitems-center justify-center rounded-md border border-transparent bg-[#eba4ad] px-8 py-3 text-base font-medium text-white hover:bg-[#ec7c8b] focus:outline-none focus:ring-2 focus:ring-[#ee98a3] focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full disabled:!cursor-not-allowed  disabled:pointer-events-none select-none'
          >
            {cart.length < 1 ? 'Thêm sản phẩm' : 'Đặt hàng'}
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}
