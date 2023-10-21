import { Siracha } from '@/app/fonts';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and polycarbonate add-ons.',
  },
  { name: 'Dimensions', description: '15" x 3.75" x .75"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  {
    name: 'Includes',
    description:
      'Pen Tray, Phone Tray, Small Tray, Large Tray, Sticky Note Holder',
  },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
];
const Hero = () => {
  return (
    <>
      <div className='bg-[#efaaa5] relative h-[70vh] min-h-[600px]  mb-10'>
        <div
          aria-hidden='true'
          className='relative h-[70vh] min-h-[600px] w-full '
        >
          <Image
            src={'/images/logo/bg.svg'}
            fill
            alt='bg'
            priority
            quality={50}
            className='bg-[#efaaa5] object-cover object-left'
          />
          {/* <div className='absolute inset-0 bg-gradient-to-t from-white/60' /> */}
        </div>
        <div className='container absolute top-0 left-1/2 -translate-x-1/2  h-[70vh] min-h-[600px] '>
          <div className='absolute top-1/2 -translate-y-1/2 left-10 flex flex-col items-start gap-4'>
            <h1
              className={cn(
                'text-4xl sm:text-5xl md:text-7xl text-white uppercase italic',
                Siracha.className
              )}
            >
              Be high-end
              <br /> with hi-anne
            </h1>
            <Link
              href='#'
              className='px-5 py-2 bg-white shadow-lg rounded-3xl text-[#e86aa7] uppercase !font-Siracha hover:scale-105 transition-all duration-200'
            >
              <span className='magic-text'>Shop Now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
