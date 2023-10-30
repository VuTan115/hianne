'use client';
import EmptyCart from '@/components/empty-cart';
import FullWidthButton from '@/components/full-width-button';
import DefaultPageLoading from '@/components/loading';
import { appendDataToMergedCells } from '@/lib/sheet';
import useCartStore from '@/store/cart';
import { currencyFormatter } from '@/utils/number-formater';
import { TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import ProductQuantity from '../../products/components/product-quantity';
const convertJsonToSheet = (data: any[]) => {
  const result = [
    Object.keys(data[0]),
    ...data.map((o: any) => Object.keys(o).map((k) => o[k])),
  ];
  return result;
};

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
  const handleOrderConfirm = () => {
    if (typeof window !== 'undefined') {
      console.log('Xác nhận đặt hàng');
      const formRef = document.getElementById(
        'user-info-form'
      ) as HTMLFormElement;
      const formData = new FormData(formRef);

      const formValues: Record<string, any> = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      // const userKeyData = convertJsonToSheet([formValues])[0];
      const userRowsData = convertJsonToSheet([formValues])[1];
      // const productKeyData = convertJsonToSheet(cart.items)[0];
      const productRowsData = convertJsonToSheet(cart.items).slice(1);
      console.log(productRowsData.map((item) => userRowsData.concat(item)));
      appendDataToMergedCells(
        'order',
        // [userKeyData.concat(productKeyData)]
        productRowsData.map((item) => userRowsData.concat(item))
      );
      formRef.requestSubmit();
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
            {cart.items.map((product, idx) => (
              <li
                key={`${product.code}-${idx}`}
                className='flex px-4 py-6 sm:px-6'
              >
                <div className='flex-shrink-0 w-20 relative'>
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    className='rounded-md'
                    fill
                  />
                </div>

                <div className='ml-6 flex flex-1 flex-col'>
                  <div className='flex'>
                    <div className='min-w-0 flex-1'>
                      <h4 className='text-sm'>
                        <a
                          href={product.slug}
                          className='font-medium text-gray-700 hover:text-gray-800'
                        >
                          {product.name}
                        </a>
                      </h4>
                      <p className='mt-1 text-sm text-gray-500'>
                        {product.code}
                      </p>
                    </div>

                    <div className='ml-4 flow-root flex-shrink-0'>
                      <button
                        type='button'
                        onClick={() => removeFromCart(product.code)}
                        className='-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500'
                      >
                        <span className='sr-only'>Remove</span>
                        <TrashIcon className='h-5 w-5' aria-hidden='true' />
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-1 items-end justify-between pt-2'>
                    <p className='mt-1 text-sm font-medium text-gray-900'>
                      {product.price}
                    </p>

                    <div className='ml-4'>
                      <ProductQuantity
                        quantity={product.quantity}
                        onMinus={() => {
                          updateCart(product.code, {
                            quantity: product.quantity - 1,
                          });
                        }}
                        onPlus={() => {
                          updateCart(product.code, {
                            quantity: product.quantity + 1,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
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
