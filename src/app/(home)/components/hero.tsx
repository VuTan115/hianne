import { CommandMenu } from '@/components/command-menu';
import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='h-[70vh]'>
        <div
          className='top-0 left-0 bg-no-repeat h-[70vh] max-w-screen w-full absolute bg-[#e0818d] z-[-1] '
          style={{
            backgroundSize: '100%',
            backgroundPositionX: '55%',
          }}
        ></div>
        <div className='container flex h-full justify-between items-center font-Pacifico'>
          <div className='max-w-xl'>
            <h1 className='text-white text-2xl md:text-6xl leading-normal'>
              Be high-end with <br />
              Hi-Anne.
            </h1>
            <CommandMenu />
          </div>
          <div className='relative min-w-[500px] h-[500px]'>
            <Image
              src={'/images/logo/logo.png'}
              className='aspect-square bg-blend-color-burn h-full w-full'
              alt='hero'
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
