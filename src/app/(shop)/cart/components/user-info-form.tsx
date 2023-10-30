'use client';
import FullWidthInput from '@/components/input';
import VietNameProvinceSelector from '@/components/vietnam-province-selector';
import { cn } from '@/lib/utils';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { FormEvent, useState } from 'react';
import { ZodError, z } from 'zod';

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
    title: 'Chuyển khoản ngân hàng',
    turnaround: 'Miễn phí thanh toán trực tuyến',
    price: 'BIDV hoặc Vietcombank',
  },
  {
    id: 2,
    title: 'Thanh toán khi nhận hàng',
    turnaround: 'Mua hàng trả tiền tận nhà',
    price: 'COD',
  },
];
const formSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  deliveryMethod: z.number(),
  paymentMethod: z.number(),
});

export default function UserInfoForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    province: '',
    district: '',
    deliveryMethod: deliveryMethods[0].id,
    paymentMethod: paymentMethods[0].id,
  });

  const [formErrors, setFormErrors] = useState<any>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      formSchema.parse(formData);
      console.log('Form data is valid:', formData);
      setFormErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          const message = err.message;
          fieldErrors[field] = message;
        });
        setFormErrors(fieldErrors);
      }
    }
  };
  return (
    <form
      className='space-y-5'
      onSubmit={handleSubmit}
      onChange={(e) => {
        const formDataRaw = new FormData(e.currentTarget);
        const plainFormData = Object.fromEntries(
          formDataRaw.entries()
        ) as Record<string, string>;
        setFormData({
          ...formData,
          email: plainFormData.email,
          name: plainFormData.name,
          address: plainFormData.address,
          phone: plainFormData.phone,
          province: plainFormData.province,
          district: plainFormData.district,
        });
      }}
    >
      <div>
        <h2 className='text-lg font-medium text-gray-900'>
          Thông tin liên lạc
        </h2>
        <Input
          type='email'
          id='email'
          name='email'
          autoComplete='email'
          label='Địa chỉ email'
        />
      </div>
      {formErrors.email && (
        <p className='text-sm text-red-500 !mt-0'>{formErrors.email}</p>
      )}
      <div className='border-t border-gray-200 pt-2'>
        <h2 className='text-lg font-medium text-gray-900'>
          Thông tin người nhận
        </h2>
        <div className='mt-2 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4'>
          <div className='sm:col-span-2'>
            <Input
              type='text'
              id='name'
              name='name'
              autoComplete='given-name'
              label='Họ và tên'
            />
            {formErrors.name && (
              <p className='text-sm text-red-500 !mt-0'>{formErrors.name}</p>
            )}
          </div>
          <VietNameProvinceSelector />
          <div className='sm:col-span-2'>
            <Input
              type='text'
              id='address'
              name='address'
              autoComplete='street-address'
              label='Địa chỉ'
            />
            {formErrors.address && (
              <p className='text-sm text-red-500 !mt-0'>{formErrors.address}</p>
            )}
          </div>
          <div className='sm:col-span-2'>
            <Input
              type='text'
              id='phone'
              name='phone'
              autoComplete='tel'
              label='Số điện thoại'
            />
            {formErrors.phone && (
              <p className='text-sm text-red-500 !mt-0'>{formErrors.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 pt-2'>
        <RadioGroup
          onChange={(val) => setFormData({ ...formData, deliveryMethod: val })}
          value={formData.deliveryMethod}
          name='deliveryMethod'
          id='deliveryMethod'
        >
          <RadioGroup.Label
            className='text-lg font-medium text-gray-900'
            htmlFor='deliveryMethod'
          >
            Phương thức vận chuyển
          </RadioGroup.Label>
          <div className='mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
            {deliveryMethods.map((deliveryMethod) => (
              <RadioOption key={deliveryMethod.id} opt={deliveryMethod} />
            ))}
          </div>
        </RadioGroup>
      </div>
      {formErrors.deliveryMethod && (
        <p className='text-sm text-red-500 !mt-0'>
          {formErrors.deliveryMethod}
        </p>
      )}

      <div className='border-t border-gray-200 pt-2'>
        <RadioGroup
          onChange={(val) => {
            setFormData({ ...formData, paymentMethod: val });
          }}
          value={formData.paymentMethod}
          name='paymentMethod'
          id='paymentMethod'
        >
          <RadioGroup.Label
            className='text-lg font-medium text-gray-900'
            htmlFor='paymentMethod'
          >
            Phương thức thanh toán
          </RadioGroup.Label>
          <div className='mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
            {paymentMethods.map((paymentMethod) => (
              <RadioOption key={paymentMethod.id} opt={paymentMethod} />
            ))}
          </div>
        </RadioGroup>
        {formErrors.paymentMethod && (
          <p className='text-sm text-red-500 !mt-0'>
            {formErrors.paymentMethod}
          </p>
        )}
        <button type='submit'>sumbit</button>
      </div>
    </form>
  );
}

// Reusable Input component
const Input = ({ id, name, type, autoComplete, label }: any) => (
  <div className=''>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='mt-1'>
      <FullWidthInput
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
      />
    </div>
  </div>
);

// Reusable RadioGroup.Option component
const RadioOption = ({ opt }: { opt: (typeof deliveryMethods)[0] }) => (
  <RadioGroup.Option
    key={opt.id}
    value={opt.id}
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
              {opt.title}
            </RadioGroup.Label>
            <RadioGroup.Description
              as='span'
              className='mt-1 flex items-center text-sm text-gray-500 mb-3'
            >
              {opt.turnaround}
            </RadioGroup.Description>
            <RadioGroup.Description
              as='span'
              className='mt-auto text-sm font-medium text-gray-900'
            >
              {opt.price}
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
);
