'use client';
import CustomImage from '@/components/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tab } from '@headlessui/react';

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      {/* Image selector */}
      <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
        <ScrollArea>
          <Tab.List className='grid gap-6 relative grid-flow-col p-2 pb-4'>
            {images.map((image: string, idx: number) => (
              <Tab
                key={idx}
                className='relative block h-24 w-24 cursor-pointer justify-evenly rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'
              >
                {({ selected }) => (
                  <>
                    <span className='sr-only'>{image}</span>
                    <span className='absolute inset-0  overflow-hidden rounded-md'>
                      <CustomImage
                        onClick={(event) => {
                          const img = event.target as HTMLImageElement;
                          img.scrollIntoView({
                            behavior: 'smooth',
                            inline: 'center',
                            block: 'nearest',
                          });
                        }}
                        priority
                        src={image}
                        alt=''
                        fill
                        className='h-full w-full object-cover object-center'
                      />
                    </span>
                    <span
                      className={cn(
                        selected ? 'ring-indigo-500' : 'ring-transparent',
                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                      )}
                      aria-hidden='true'
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
          <ScrollBar orientation='horizontal' className='mt-2' />
        </ScrollArea>
      </div>

      <Tab.Panels className='aspect-h-1 aspect-w-1 w-full h-full flex-shrink-1 flex-grow bg-transparent'>
        {images.map((image: string) => (
          <Tab.Panel
            unmount={false}
            key={image}
            className='relative h-full w-full min-h-[600px] shadow-lg bg-transparent rounded-lg  bg-slate-50'
          >
            <CustomImage
              src={image}
              fill
              alt=''
              className='h-full w-full object-cover object-center sm:rounded-lg'
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
export default ProductImages;
