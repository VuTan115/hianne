'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { RadioGroup } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useState } from 'react';

import ProductQuantity from './product-quantity';

type Props = {
  colorCodes: { name: string; inStock: boolean }[];
};
const ProductAttrPicker = ({ colorCodes }: Props) => {
  const params = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedCode, setSelectedCode] = useState(
    colorCodes.find((i) => i.name == params.get('code')) || colorCodes[0]
  );

  function updateQueryParam(
    paramName: string,
    paramValue: string | number | null
  ) {
    const params = new URLSearchParams(window.location.search);
    if (paramValue !== null) {
      params.set(paramName, String(paramValue));
    } else {
      params.delete(paramName);
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleSelectCode(value: { name: string; inStock: boolean }) {
    setSelectedCode(value);
    const { name } = value;
    updateQueryParam('code', name);
  }

  function handleChangeQuantity(value: number) {
    updateQueryParam('quantity', value);
  }
  return (
    <>
      <div className='mt-10 space-y-2 md:space-y-4'>
        <h3 className='text-sm text-gray-600'>Số lượng</h3>
        <ProductQuantity
          quantity={Number(params.get('quantity') || 1)}
          buttonClassName='h-7 w-7'
          onPlus={handleChangeQuantity}
          onMinus={handleChangeQuantity}
        />
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium text-gray-900'>Mã màu</h3>
          <Dialog>
            <DialogTrigger className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
              {' '}
              Color guide
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Hướng dẫn chọn màu</DialogTitle>
                <DialogDescription>1 cái ảnh hướng dẫn chọn</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <RadioGroup
          value={selectedCode}
          onChange={handleSelectCode}
          className='mt-4'
        >
          <RadioGroup.Label className='sr-only'>
            Choose a color
          </RadioGroup.Label>
          <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
            {colorCodes.map((code, idx) => (
              <RadioGroup.Option
                key={`${code.name}-${idx}`}
                value={code}
                disabled={!code.inStock}
                className={({ active }) =>
                  cn(
                    code.inStock
                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                    selectedCode.name === code.name
                      ? 'ring-2 ring-indigo-500'
                      : '',
                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 select-none'
                  )
                }
              >
                {({ active, checked }: any) => (
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

export default ProductAttrPicker;
