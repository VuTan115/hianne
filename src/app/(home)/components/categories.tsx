import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';

import Image from 'next/image';
import { productCategories } from '../data/albums';

const Categories = () => {
  return (
    <section className='container'>
      <div className='mt-6 space-y-1 '>
        <h2 className='text-2xl font-semibold tracking-tight'>
          Danh mục sản phẩm
        </h2>
      </div>
      <Separator className='my-4' />
      <div className='relative'>
        <ScrollArea>
          <div className='flex space-x-4 pb-4'>
            {productCategories.map((category) => (
              <div
                key={category.name}
                className='w-[100px] cursor-pointer space-y-3'
              >
                <div className='relative overflow-hidden rounded-full w-[100px] h-[100px]'>
                  <Image
                    src={category.thumbnail}
                    alt={category.name}
                    fill
                    priority
                    className='aspect-square object-cover scale-150 hover:scale-[1.6]'
                  />
                </div>
                <div className='space-y-1 text-sm'>
                  <h3 className='leading-none text-center  font-bold'>
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </section>
  );
};

export default Categories;
