import Carousel from '@/components/carousel';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <section className='container relative min-h-[200px] md:min-h-[400px] lg:min-w-[600px] w-full my-5'>
      {/* <div className='flex overflow-x-scroll inset-0 scroll-smooth snap-x snap-mandatory absolute hide_scrollbar'>
        <div className='relative h-full w-full flex-shrink-0'>
          <Image
            src='/images/banners/comming-soon.png'
            fill
            className='object-center object-contain flex-1'
            alt='các sản phẩm sắp được bán của Hi Anne shop'
          />
        </div>
        <div className='relative h-full w-full flex-shrink-0'>
          <Image
            src='/images/banners/best-seller.png'
            fill
            className='object-center object-contain flex-1'
            alt='các sản phẩm sắp được bán của Hi Anne shop'
          />
        </div>
        <div className='relative h-full w-full flex-shrink-0'>
          <Image
            src='/images/banners/order-process.png'
            fill
            className='object-center object-contain flex-1'
            alt='các sản phẩm sắp được bán của Hi Anne shop'
          />
        </div>
      </div> */}
      <Carousel loop>
        {[
          '/images/banners/comming-soon.png',
          '/images/banners/order-process.png',
          '/images/banners/best-seller.png',
        ].map((src, idx) => {
          return (
            <Image
              key={`${src}-${idx}`}
              src={src}
              priority
              alt='Hianne shop sắp có sản phẩm mới'
              fill
              className='object-contain'
            />
          );
        })}
      </Carousel>
    </section>
  );
};

export default Banner;
