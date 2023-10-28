'use client';

import ProductQuantity from '@/app/products/components/product-quantity';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import useCart from '@/hooks/use-cart';
import { currencyFormatter } from '@/utils/number-formater';
import { useState } from 'react';

export function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, calculateTotalPrice } = useCart()
  console.log(cart)
  return (
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
          {cart.length > 0 && <span className='text-white text-xs bg-red-400 rounded-full absolute top-0 right-0 h-4 w-4'>{cart.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='pr-5 pb-10 bg-white flex flex-col justify-between'>
        {/* {cart.length > 0 ? <>

        </> : <span className='text-base text-center text-black font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Gio hang trong</span>} */}
        <span className='font-bold'>{siteConfig.name}</span>
        <ScrollArea className='my-4  flex-1 '>
          <ul role="list" className="divide-y divide-gray-100">
            {
              cart && cart.map(item =>
                <li key={item.slug} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.thumbnail} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.code}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col justify-between sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{item.price}</p>

                    <ProductQuantity quantity={item.quantity} />
                  </div>
                </li>
              )

            }
          </ul>
        </ScrollArea>
        <div className="flex justify-between items-center">
          <span>Tổng cộng:</span>
          <span className='font-bold text-xl text-black'>{currencyFormatter.format(calculateTotalPrice())}</span>
        </div>
        <button
          type='button'
          className='flex max-w-xsitems-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
        >
          Đặt hàng
        </button>
      </SheetContent>
    </Sheet>
  );
}
