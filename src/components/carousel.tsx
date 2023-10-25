'use client';
import { cn } from '@/lib/utils';
import { clamp } from '@/utils/number-formater';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React, { useCallback, useEffect } from 'react';

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

const Carousel = ({ children, loop, autoPlay }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const maxSlideIndex: number = children.length - 1;
  const slideRef = React.useRef<HTMLDivElement>(null);
  const scrollIntoView = React.useCallback((idx: number) => {
    const slide = slideRef?.current;
    if (slide) {
      slide.style.transform = `translateX(${-100 * idx}%)`;
    }
  }, []);
  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(clamp(idx, 0, maxSlideIndex));
      scrollIntoView(clamp(idx, 0, maxSlideIndex));
    },
    [maxSlideIndex, scrollIntoView]
  );
  const next = useCallback(() => {
    if (currentIndex < maxSlideIndex) {
      goTo(currentIndex + 1);
    } else if (loop) {
      goTo(0);
    }
  }, [currentIndex, goTo, maxSlideIndex, loop]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    } else if (loop) {
      goTo(maxSlideIndex);
    }
  }, [currentIndex, goTo, maxSlideIndex, loop]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (loop) {
          next();
        } else if (currentIndex < maxSlideIndex) {
          next();
        } else {
          clearInterval(interval);
        }
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [autoPlay, currentIndex, maxSlideIndex, loop, next]);

  return (
    <CarouselContext.Provider
      value={{ currentIndex, next, prev, maxSlideIndex, goTo }}
    >
      <div className='relative'>
        <div className='w-full relative min-h-[300px] lg:min-h-[50vh] overflow-hidden'>
          <div
            ref={slideRef}
            className='flex flex-row h-full w-full min-h-[300px] lg:min-h-[50vh] flex-shrink-0 flex-grow-1 transition-all duration-300'
          >
            {children.map((child, idx) => {
              return (
                <div
                  key={idx}
                  className='relative h-full max-w-full w-full min-h-[300px] lg:min-h-[50vh] flex-shrink-0 flex-grow-1 overflow-hidden '
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>

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
