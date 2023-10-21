import Carousel from '@/components/carousel';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <section className='container'>
      <div className='relative min-h-[600px] w-full my-5'>
        <Image
          src='/images/banners/comming-soon.svg'
          fill
          alt='các sản phẩm sắp được bán của Hi Anne shop'
        />
      </div>
      {/* <Carousel autoPlay>
        {[
          '/images/banners/comming-soon.svg',
          '/images/banners/bg.svg',
          '/images/banners/logo.svg',
        ].map((src, idx) => {
          return (
            <Image
              key={`${src}-${idx}`}
              src={src}
              className='rounded-md'
              priority
              alt='Next.js Conf image'
              fill
            />
          );
        })}
      </Carousel> */}
    </section>
  );
};

export default Banner;
