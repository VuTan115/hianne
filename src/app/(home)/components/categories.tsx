import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';

import Image from 'next/image';
const productCategories: { name: string; thumbnail: string }[] = [
  {
    name: 'Son',
    thumbnail: '/images/categories/son.svg',
  },
  {
    name: 'Mascara',
    thumbnail: '/images/categories/mascara.svg',
  },
  {
    name: 'Phấn mắt',
    thumbnail: '/images/categories/phanmat.svg',
  },
  {
    name: 'Phấn má',
    thumbnail: '/images/categories/phanma.svg',
  },
  {
    name: 'Phấn phủ',
    thumbnail: '/images/categories/phanphu.svg',
  },
  {
    name: 'Kẻ mắt, chân mày, môi',
    thumbnail: '/images/categories/ke.svg',
  },
  {
    name: 'Kem nền',
    thumbnail: '/images/categories/kemnen.svg',
  },
  {
    name: 'Kem lót',
    thumbnail: '/images/categories/kemlot.svg',
  },
  {
    name: 'Kem chống nắng',
    thumbnail: '/images/categories/kemchongnang.svg',
  },
  {
    name: 'Kẹp mi',
    thumbnail: '/images/categories/kepmi.svg',
  },
  {
    name: 'Khác',
    thumbnail: '/images/categories/more.svg',
  },
];

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
                  <h3 className='leading-none text-center  font-semibold'>
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
