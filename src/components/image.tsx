'use client';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  // add any additional props you need
}

const CustomImage = (props: CustomImageProps) => {
  return (
    <Image
      {...props}
      placeholder='blur'
      blurDataURL={(props.src as string) || '/images/noise-extra-small.png'}
      onLoadingComplete={(img) => {
        img.classList.remove('blur-md', 'bg-gray-200', 'animate-pulse');
      }}
      className={cn(
        'w-full h-full animate-pulse blur-md bg-gray-200',
        props.className
      )}
      alt={props.alt || 'Hi Anne'}
    />
  );
};

export default CustomImage;
