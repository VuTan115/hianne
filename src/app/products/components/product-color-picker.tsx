'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { RadioGroup } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

import { useState } from 'react';
const colors = [
  {
    name: 'Washed Black',
    bgColor: 'bg-gray-700',
    selectedColor: 'ring-gray-700',
  },
  {
    name: 'White',
    bgColor: 'bg-white',
    selectedColor: 'ring-gray-400',
  },
  {
    name: 'Washed Gray',
    bgColor: 'bg-gray-500',
    selectedColor: 'ring-gray-500',
  },
];

type Props = {
  colors?: string[]
  colorCodes: { name: string, inStock: boolean }[];
}
const ProductColorPicker = ({ colorCodes }: Props) => {
  const params = useSearchParams()
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedSize, setSelectedSize] = useState(colorCodes[0]);
  function handleSelectCode(value: { name: string, inStock: boolean }) {
    setSelectedSize(value)
    const { name } = value
    const params = new URLSearchParams(window.location.search);
    if (name) {
      params.set('code', name);
    } else {
      params.delete('code');
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`,
        { scroll: false });
    });
  }
  return (
    <>
      {/* <RadioGroup
        value={selectedColor}
        onChange={setSelectedColor}
        className='mt-2'
      >
        <RadioGroup.Label className='sr-only'>Choose a color</RadioGroup.Label>
        <span className='flex items-center space-x-3'>
          {colors.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color}
              className={({ active, checked }) =>
                cn(
                  color.selectedColor,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                )
              }
            >
              <RadioGroup.Label as='span' className='sr-only'>
                {color.name}
              </RadioGroup.Label>
              <span
                aria-hidden='true'
                className={cn(
                  color.bgColor,
                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                )}
              />
            </RadioGroup.Option>
          ))}
        </span>
      </RadioGroup> */}
      {/* Sizes */}
      <div className='mt-10'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium text-gray-900'>Mã màu</h3>


          <Dialog>
            <DialogTrigger className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>  Color guide</DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Hướng dẫn chọn màu</DialogTitle>
                <DialogDescription>
                  1 cái ảnh hướng dẫn chọn
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <RadioGroup
          value={selectedSize}
          defaultValue={{ name: params.get('code'), inStock: true }}
          onChange={handleSelectCode}
          className='mt-4'
        >
          <RadioGroup.Label className='sr-only'>Choose a size</RadioGroup.Label>
          <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
            {colorCodes.map((code) => (
              <RadioGroup.Option
                key={code.name}
                value={code}
                disabled={!code.inStock}
                className={({ active }) =>
                  cn(
                    code.inStock
                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label as='span'>{code.name}</RadioGroup.Label>
                    {code.inStock ? (
                      <span
                        className={cn(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-md'
                        )}
                        aria-hidden='true'
                      />
                    ) : (
                      <span
                        aria-hidden='true'
                        className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                      >
                        <svg
                          className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                          viewBox='0 0 100 100'
                          preserveAspectRatio='none'
                          stroke='currentColor'
                        >
                          <line
                            x1={0}
                            y1={100}
                            x2={100}
                            y2={0}
                            vectorEffect='non-scaling-stroke'
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default ProductColorPicker;
