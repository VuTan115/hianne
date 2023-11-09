'use client';
import EmptyCart from '@/components/empty-cart';
import FullWidthButton from '@/components/full-width-button';
import DefaultPageLoading from '@/components/loading';
import { addOrder } from '@/lib/sheet';
import useCartStore from '@/store/cart';
import { currencyFormatter } from '@/utils/number-formater';
import spinner from '@/utils/spinner';
import { createUrl } from '@/utils/url-handler';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import ProductQuantity from '../../products/components/product-quantity';

const OrderSumary = () => {
  const { cart, removeFromCart, updateCart } = useCartStore();
  if (typeof window === 'undefined')
    return (
      <div className='relative'>
        <DefaultPageLoading />
      </div>
    );

  if (cart.items.length === 0) return <EmptyCart />;
  const totalItemsPrice = cart.total;
  const shippingFee = 15000;
  const taxFee = totalItemsPrice / 100;
  const handleOrderConfirm = async () => {
    if (typeof window !== 'undefined') {
      console.log('Xác nhận đặt hàng');
      const formRef = document.getElementById(
        'user-info-form'
      ) as HTMLFormElement;
      const formData = new FormData(formRef);

      const formValues: Record<string, any> = { id: 'generate-on-server' };
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      formRef.requestSubmit();
      if (!formRef.checkValidity()) return;
      const userRowsData = formValues;
      const productRowsData = cart.items;
      spinner.showLoading();
      await addOrder(userRowsData, productRowsData)
        .then((result) => {
          console.log(result);
          alert('Đặt hàng thành công');
          window.location.href = '/order-sumary';
        })
        .finally(() => spinner.hideLoading());
    }
  };
  return (
    <>
      <div className='mt-10 lg:mt-0'>
        <h2 className='text-lg font-medium text-gray-900'>Chi tiết đơn hàng</h2>

        <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
          <h3 className='sr-only'>Items in your cart</h3>
          <ul
            role='list'
            className='divide-y divide-gray-200 max-h-[400px] min-h-[200px] overflow-auto'
          >
            <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
              <ul className='flex-grow overflow-auto py-4'>
                {cart.items.map((item, i) => {
                  const merchandiseSearchParams = {
                    category: item.category,
                  } as {
                    [key: string]: string;
                  };
                  const merchandiseUrl = createUrl(
                    `/products/${item.slug}`,
                    new URLSearchParams(merchandiseSearchParams)
                  );
                  return (
                    <li
                      key={`${item.id}-${i}-${item.code}`}
                      className='flex w-full flex-col'
                    >
                      <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                        <div className='absolute z-40 -mt-2 ml-[55px]'>
                          <button
                            type='button'
                            onClick={(
                              e: React.FormEvent<HTMLButtonElement>
                            ) => {
                              removeFromCart(item.code);
                            }}
                            aria-label='Remove cart item'
                            className='ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200'
                          >
                            <XMarkIcon className='hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black' />
                          </button>
                        </div>
                        <Link
                          href={merchandiseUrl}
                          className='z-30 flex flex-row space-x-4'
                        >
                          <div className='relative h-16 w-16 block cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                            <Image
                              className='h-full w-full object-cover'
                              width={64}
                              height={64}
                              alt={item.name}
                              src={item.thumbnail}
                            />
                          </div>
                          <div className='flex flex-1 flex-col text-base'>
                            <span className='leading-tight'>{item.name}</span>
                            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                              {item.code}
                            </p>
                          </div>
                        </Link>
                        <div className='flex h-16 flex-col justify-between'>
                          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {item.price}
                          </p>
                          <div className='ml-auto flex h-9 flex-row items-center '>
                            <ProductQuantity
                              quantity={item.quantity}
                              onMinus={(val) => {
                                console.log(val);
                                updateCart(item.code, {
                                  quantity: item.quantity - 1,
                                });
                              }}
                              onPlus={(val) => {
                                updateCart(item.code, {
                                  quantity: item.quantity + 1,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ul>
          <dl className='space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
            <div className='flex items-center justify-between'>
              <dt className='text-sm'>Tiền hàng</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {currencyFormatter.format(cart.total)}
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='text-sm'>Phí ship</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {currencyFormatter.format(shippingFee)}
              </dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='text-sm'>Thuế</dt>
              <dd className='text-sm font-medium text-gray-900'>
                {currencyFormatter.format(taxFee)}
              </dd>
            </div>
            <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
              <dt className='text-base font-medium'>Tổng</dt>
              <dd className='text-base font-medium text-gray-900'>
                {currencyFormatter.format(
                  Math.round(totalItemsPrice + shippingFee + taxFee)
                )}
              </dd>
            </div>
          </dl>

          <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
            <FullWidthButton onClick={handleOrderConfirm}>
              Xác nhận đơn hàng
            </FullWidthButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSumary;
