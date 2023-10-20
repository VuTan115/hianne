'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { docsConfig } from '@/config/docs';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <HamburgerMenuIcon className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <Icons.logo className='mr-2 h-4 w-4' />
        <span className='font-bold'>{siteConfig.name}</span>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='flex flex-col space-y-3'>
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className='flex flex-col space-y-3 pt-6'>
                <h4 className='font-medium'>{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
