import { cn } from '@/lib/utils';
import React from 'react';

interface FullWidthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FullWidthButton: React.FC<FullWidthButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={cn(
        'block m-atuo w-full rounded-md border border-transparent bg-[#ec7c8b] px-8 py-3 text-base font-medium text-white hover:bg-[#f16a7c] focus:outline-none focus:ring-2 focus:ring-[#ee98a3] focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full disabled:!cursor-not-allowed  disabled:pointer-events-none select-none',
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default FullWidthButton;
