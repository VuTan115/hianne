'use client';
import FullWidthInput from '@/components/input';
import { cn } from '@/lib/utils';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const deliveryMethods = [
  {
    id: 1,
    title: 'Nhanh',
    turnaround: 'Từ 1-2 ngày kể từ khi đặt hàng',
    price: '15.000đ',
  },
  { id: 2, title: 'Hỏa tốc', turnaround: 'Trong ngày', price: '30.000đ' },
];

const paymentMethods = [
  {
    id: 1,
    title: 'Chuyển khoản',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  {
    id: 2,
    title: 'Thanh toán khi nhận hàng',
    turnaround: '2–5 business days',
    price: '$16.00',
  },
];

const inputClasses =
  'w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-1 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';
export default function UserInfoForm() {
  return (
    <form className='space-y-5'>
      <div>
        <h2 className='text-lg font-medium text-gray-900'>
          Thông tin liên lạc
        </h2>

        <div className='mt-4'>
          <label
            htmlFor='email-address'
            className='block text-sm font-medium text-gray-700'
          >
            Địa chỉ email
          </label>
          <div className='mt-1'>
            <FullWidthInput
              type='email'
              id='email-address'
              name='email-address'
              autoComplete='email'
            />
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-2'>
        <h2 className='text-lg font-medium text-gray-900'>
          Thông tin người nhận
        </h2>

        <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
          <div className='sm:col-span-2'>
            <label
              htmlFor='first-name'
              className='block text-sm font-medium text-gray-700'
            >
              Họ và tên
            </label>
            <div className='mt-1'>
              <FullWidthInput
                type='text'
                id='first-name'
                name='first-name'
                autoComplete='given-name'
              />
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'
            >
              Địa chỉ
            </label>
            <div className='mt-1'>
              <FullWidthInput
                type='text'
                name='address'
                id='address'
                autoComplete='street-address'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm font-medium text-gray-700'
            >
              Thành phố
            </label>
            <div className='mt-1'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className={inputClasses}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm font-medium text-gray-700'
            >
              Thành phố
            </label>
            <div className='mt-1'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className={inputClasses}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Số điện thoại
            </label>
            <div className='mt-1'>
              <FullWidthInput
                type='text'
                name='phone'
                id='phone'
                autoComplete='tel'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-2'>
        <RadioGroup defaultValue={deliveryMethods[0]}>
          <RadioGroup.Label className='text-lg font-medium text-gray-900'>
            Phương thức vận chuyển
          </RadioGroup.Label>

          <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
            {deliveryMethods.map((deliveryMethod) => (
              <RadioGroup.Option
                key={deliveryMethod.id}
                value={deliveryMethod}
                className={({ checked, active }) =>
                  cn(
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className='flex flex-1'>
                      <span className='flex flex-col'>
                        <RadioGroup.Label
                          as='span'
                          className='block text-sm font-medium text-gray-900'
                        >
                          {deliveryMethod.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as='span'
                          className='mt-1 flex items-center text-sm text-gray-500'
                        >
                          {deliveryMethod.turnaround}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as='span'
                          className='mt-6 text-sm font-medium text-gray-900'
                        >
                          {deliveryMethod.price}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    {checked ? (
                      <CheckCircleIcon
                        className='h-5 w-5 text-indigo-600'
                        aria-hidden='true'
                      />
                    ) : null}
                    <span
                      className={cn(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg'
                      )}
                      aria-hidden='true'
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className='border-t border-gray-200 pt-2'>
        <RadioGroup defaultValue={paymentMethods[0]}>
          <RadioGroup.Label className='text-lg font-medium text-gray-900'>
            Phương thức thanh toán
          </RadioGroup.Label>

          <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
            {paymentMethods.map((deliveryMethod) => (
              <RadioGroup.Option
                key={deliveryMethod.id}
                value={deliveryMethod}
                className={({ checked, active }) =>
                  cn(
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className='flex flex-1'>
                      <span className='flex flex-col'>
                        <RadioGroup.Label
                          as='span'
                          className='block text-sm font-medium text-gray-900'
                        >
                          {deliveryMethod.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as='span'
                          className='mt-1 flex items-center text-sm text-gray-500'
                        >
                          {deliveryMethod.turnaround}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as='span'
                          className='mt-6 text-sm font-medium text-gray-900'
                        >
                          {deliveryMethod.price}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    {checked ? (
                      <CheckCircleIcon
                        className='h-5 w-5 text-indigo-600'
                        aria-hidden='true'
                      />
                    ) : null}
                    <span
                      className={cn(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg'
                      )}
                      aria-hidden='true'
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </form>
  );
}
