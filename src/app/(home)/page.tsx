import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { Button } from '@//components/ui/button';
import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@//components/ui/tabs';

import { AlbumArtwork } from './components/album-artwork';
import { PodcastEmptyPlaceholder } from './components/podcast-empty-placeholder';
import { Sidebar } from './components/sidebar';
import { listenNowAlbums, productCategories } from './data/albums';
import { playlists } from './data/playlists';
import Image from 'next/image';

export default function MusicPage() {
  return (
    <>
      <div className='block h-[500px] my-5'>
        <div className='container grid lg:grid-cols-6 h-full gap-2'>
          <div className='col-span-4 relative  px-4 py-6 lg:px-8 lg:py-10'>
            <>
              <Image
                src={productCategories[0].cover}
                className='rounded-md'
                priority
                alt='Next.js Conf image'
                fill
              />
              {1 > 0 && (
                <button
                  className='absolute left-3 top-[calc(50%-16px)]  bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <ChevronLeftIcon className='h-6 w-6' />
                </button>
              )}
              {0 + 1 < productCategories.length && (
                <button
                  className='absolute right-3 top-[calc(50%-16px)]  bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <ChevronRightIcon className='h-6 w-6' />
                </button>
              )}
            </>
          </div>
          <div className='col-span-2 grid grid-flow-row gap-2 '>
            <div className='h-full relative'>
              <Image
                src={productCategories[0].cover}
                priority
                className='rounded-md'
                alt='Image'
                fill
              />
            </div>
            <div className='h-full relative'>
              <Image
                className='rounded-md'
                src={productCategories[0].cover}
                priority
                alt='Next.js Conf image'
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-background border-t block'>
        <div className='grid lg:grid-cols-5'>
          <Sidebar playlists={playlists} className='hidden lg:block' />
          <div className='col-span-3 lg:col-span-4 lg:border-l'>
            <div className='h-full px-4 py-6 lg:px-8'>
              <Tabs defaultValue='music' className='h-full space-y-6'>
                <div className='space-between flex items-center'>
                  <TabsList>
                    <TabsTrigger value='music' className='relative'>
                      Sản phẩm có sẵn
                    </TabsTrigger>
                    <TabsTrigger value='podcasts'>Sale</TabsTrigger>
                    <TabsTrigger value='live' disabled>
                      Live
                    </TabsTrigger>
                  </TabsList>
                  <div className='ml-auto mr-4'>
                    <Button>
                      <PlusCircledIcon className='mr-2 h-4 w-4' />
                      Xem thêm
                    </Button>
                  </div>
                </div>
                <TabsContent
                  value='music'
                  className='border-none p-0 outline-none'
                >
                  <div className='mt-6 space-y-1'>
                    <h2 className='text-2xl font-semibold tracking-tight'>
                      Made for You
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
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className='w-[150px]'
                            aspectRatio='square'
                            width={150}
                            height={150}
                          />
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
                </TabsContent>
                <TabsContent
                  value='podcasts'
                  className='h-full flex-col border-none p-0 data-[state=active]:flex'
                >
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <h2 className='text-2xl font-semibold tracking-tight'>
                        New Episodes
                      </h2>
                      <p className='text-sm text-muted-foreground'>
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className='my-4' />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
