'use client';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
// import { ReactEventHandler, SyntheticEvent } from 'react';
const fallbackSrc = '/images/noise-extra-small.png';
interface CustomImageProps extends ImageProps {
  // add any additional props you need
}

const CustomImage = (props: CustomImageProps) => {
  return (
    <Image
      {...props}
      placeholder='blur'
      blurDataURL={(props.src as string) || fallbackSrc}
      // onLoad={(e: SyntheticEvent<HTMLImageElement, Event>) => {
      //   const img = e.currentTarget;
      //   img.classList.remove('blur-md', 'bg-gray-200', 'animate-pulse');
      // }}
      className={cn(
        'w-full h-full',
        props.className
      )}
      alt={props.alt || 'Hi Anne'}
    />
  );
};

export default CustomImage;
