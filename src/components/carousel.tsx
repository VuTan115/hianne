'use client';
import { cn } from '@/lib/utils';
import { clamp } from '@/utils/number-formater';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
};
type CarouselContextProps = {
  currentIndex: number;
  maxSlideIndex: number;
  next: () => void;
  prev: () => void;
  goTo: (idx: number) => void;
};
const CarouselContext = React.createContext<CarouselContextProps>({
  currentIndex: 0,
  maxSlideIndex: 0,
  goTo: () => undefined,
  next: () => undefined,
  prev: () => undefined,
});

const Carousel = ({ children }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const maxSlideIndex: number = children.length - 1;
  const next = () => {
    setCurrentIndex((pre) => clamp(pre + 1, 0, maxSlideIndex));
  };
  const prev = () => {
    setCurrentIndex((pre) => clamp(pre - 1, 0, maxSlideIndex));
  };
  const goTo = (idx: number) => {
    setCurrentIndex(clamp(idx, 0, maxSlideIndex));
  };

  return (
    <CarouselContext.Provider
      value={{ currentIndex, next, prev, maxSlideIndex, goTo }}
    >
      <div className='relative'>
        <div className='relative h-full w-full min-h-[600px]'>
          {children[currentIndex]}
        </div>
        {currentIndex}
        <Dots />
        <CarouselController />
      </div>
    </CarouselContext.Provider>
  );
};

export default Carousel;

const CarouselController = () => {
  const { next, prev } = React.useContext(CarouselContext);
  return (
    <>
      {
        <button
          className='absolute left-3 top-[calc(50%-16px)]  bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none rounded-full hover:scale-110 opacity-40 hover:opacity-100'
          onClick={() => {
            prev();
          }}
        >
          <ChevronLeftIcon className='h-6 w-6' />
        </button>
      }
      <button
        className='absolute right-3 top-[calc(50%-16px)]  bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none rounded-full hover:scale-110 opacity-40 hover:opacity-100'
        onClick={() => {
          next();
        }}
      >
        <ChevronRightIcon className='h-6 w-6' />
      </button>
    </>
  );
};

const Dots = () => {
  const { goTo, currentIndex, maxSlideIndex } =
    React.useContext(CarouselContext);

  return (
    <div className='bg-black/10 rounded-md px-3 py-1 flex justify-center w-fit absolute left-1/2 -translate-x-1/2 bottom-14 gap-2'>
      {new Array(maxSlideIndex + 1).fill(null).map((_, idx) => (
        <div
          onClick={() => goTo(idx)}
          key={`${idx}`}
          className={cn(
            'h-4 w-4 rounded-full ',
            currentIndex === idx
              ? 'bg-white'
              : 'bg-white/30 hover:bg-white/50 transition cursor-pointer'
          )}
        ></div>
      ))}
    </div>
  );
};
