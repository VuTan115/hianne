import React from 'react';
import FullWidthButton from './full-width-button';
import Link from 'next/link';

const EmptyCart = () => {
  return (
    <div className=' min-h-[200px] border border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center p-5 gap-6'>
      <div className='inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-pink-50 bg-pink-100 dark:border-pink-900 dark:bg-pink-800'>
        <svg
          className='w-6 h-6 text-pink-600 dark:text-pink-400'
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path d='M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z' />
        </svg>
      </div>
      <h3 className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-200'>
        Chưa có sản phẩm trong giỏ hàng!
      </h3>
      <p className='text-gray-500 text-sm max-w-sm'>
        Mua hàng cùng chúng tôi để cảm nhận sự khác biệt
      </p>

      <FullWidthButton className='max-w-xs shadow-md'>
        <Link href='/'>Khám phá sản phẩm ngay </Link>
      </FullWidthButton>
    </div>
  );
};

export default EmptyCart;
