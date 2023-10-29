import { Siracha } from '@/app/fonts';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <div className='bg-[#efaaa5] relative h-[70vh] min-h-[600px]  mb-10'>
        <div
          aria-hidden='true'
          className='absolute h-[70vh] min-h-[600px] w-full '
        >
          <Image
            src={'/images/logo/bg.svg'}
            fill
            alt='bg'
            priority
            quality={50}
            className=' object-cover object-center'
          />
          {/* <div className='absolute inset-0 bg-gradient-to-t from-white/60' /> */}
        </div>
        <div className='container py-10 flex h-[70vh] min-h-[600px]  w-full justify-between items-center gap-5 flex-wrap md:flex-nowrap overflow-hidden'>
          <div className='relative w-full h-full flex flex-col items-start justify-center gap-8 2xl:min-w-[30vw]'>
            <h1
              className={cn(
                'text-4xl xs:text-5xl sm:text-6xl xl:text-7xl text-[#db8c8c] uppercase italic',
                Siracha.className
              )}
              style={{ textShadow: '3px 3px #f8cecf' }}
            >
              Be&nbsp;
              <span className='whitespace-nowrap'>high-end</span>
              <br /> with <span className='whitespace-nowrap'>hi-anne</span>
            </h1>
            <Link
              href='#'
              className='px-5 py-2 bg-white shadow-lg rounded-3xl text-[#e86aa7] uppercase !font-Siracha hover:scale-105 transition-all duration-200'
            >
              <span className='magic-text'>Shop Now</span>
            </Link>
          </div>
          <div className='relative w-full h-full max-h-[550px] hidden md:block'>
            <Image
              src={'/images/banners/hero.svg'}
              fill
              alt='bg'
              priority
              quality={50}
              className=' object-contain object-center'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
