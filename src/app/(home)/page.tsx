import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';

import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AlbumArtwork } from './components/album-artwork';
import Hero from './components/hero';
import { listenNowAlbums, productCategories } from './data/albums';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />

      <div className='bg-background block container'>
        <div className='grid lg:grid-cols-5'>
          {/* <Sidebar playlists={playlists} className='hidden lg:block' /> */}
          <div className='w-full col-span-full rounded-sm overflow-hidden'>
            <div className='h-full px-4 py-6 lg:px-8'>
              <div className='border-none p-0 outline-none'>
                <div className='mt-6 space-y-1'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Danh mục sản phẩm
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    Your personal playlists. Updated daily.
                  </p>
                </div>
                <Separator className='my-4' />
                <div className='relative'>
                  <ScrollArea>
                    <div className='flex space-x-4 pb-4'>
                      {productCategories.map((album) => (
                        <div
                          key={album.name}
                          className='w-[100px] cursor-pointer space-y-3'
                        >
                          <div className='overflow-hidden rounded-full h-auto'>
                            <Image
                              src={album.cover}
                              alt={album.name}
                              width={100}
                              height={100}
                              className={cn(
                                'h-auto w-auto object-cover transition-all scale-150 hover:scale-[1.6]',
                                'aspect-square'
                              )}
                            />
                          </div>
                          <div className='space-y-1 text-sm'>
                            <h3 className='font-medium leading-none text-center'>
                              {album.name}
                            </h3>
                            <p className='text-xs text-muted-foreground'>
                              {album.artist}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                      Available
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                      Top picks for you. Updated daily.
                    </p>
                  </div>
                </div>
                <Separator className='my-4' />
                <div className='relative'>
                  <ScrollArea>
                    <div className='flex space-x-4 pb-4'>
                      {listenNowAlbums.map((album) => (
                        <AlbumArtwork
                          key={album.name}
                          album={album}
                          className='w-[250px]'
                          aspectRatio='portrait'
                          width={250}
                          height={330}
                        />
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
