'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

export function Cart() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='p-2 text-base hover:bg-black/10 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
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
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='pr-0'>
        <Icons.logo className='h-4 w-4' />
        <span className='font-bold'>{siteConfig.name}</span>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          items go here
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
