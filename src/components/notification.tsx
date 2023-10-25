'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

export function Notification() {
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
              d='M12 3.5c.63 0 1.2.41 1.41 1.01l.23.66.66.25c2.52.95 4.21 3.39 4.21 6.07v3c0 .57.2 1.61 1.5 2.43v1.07H4v-1.07c1.3-.82 1.5-1.86 1.5-2.42v-3c0-2.68 1.69-5.12 4.21-6.07l.66-.25.23-.66c.2-.61.77-1.02 1.4-1.02zM12 2c-1.31 0-2.42.85-2.82 2.02A7.992 7.992 0 004 11.5s.01 2.5 0 3c0 .6-.54 1.02-.98 1.26-.32.18-.53.51-.53.88v1.86c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-1.86c0-.37-.21-.7-.53-.88-.43-.24-.97-.66-.97-1.26v-3c0-3.42-2.15-6.34-5.18-7.48A2.963 2.963 0 0012 2z'
            ></path>
            <path
              fill='#0009'
              d='M13.73 19.5a1.996 1.996 0 01-3.46 0h3.46zm1.72-1.5h-6.9c-.02.16-.05.33-.05.5 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.17-.03-.34-.05-.5z'
            ></path>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='pr-0'>
        <Icons.logo className='mr-2 h-4 w-4' />
        <span className='font-bold'>{siteConfig.name}</span>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          items go here
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
