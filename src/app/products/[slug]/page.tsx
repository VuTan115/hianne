import { Product } from '@/interfaces/product';
import { findRowBySlug, getSheetData } from '@/lib/sheet';
import { cn } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/20/solid';
import AddToCart from '../components/add-to-cart';
import ProductAttrPicker from '../components/product-attr-picker';
import ProductImages from '../components/product-images';
import Reviews from '../components/reviews';
export const revalidate = 1;
const sheetsName = ['lipstick', 'ke', 'phan'];
// export async function generateStaticParams() {
//   const res = Promise.allSettled([
//     sheetsName.map(item => getSheetData(item))
//   ])
//   res
// }
type Props = {
  params: { slug: string };
};

const Product = async ({ params }: Props) => {
  // console.log(
  //   await Promise.allSettled([sheetsName.map((item) => getSheetData(item))])
  // );
  console.log(await getSheetData('ke'))
  const product: Product = await findRowBySlug(
    decodeURI(params.slug),
    'lipstick'
  );
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
          {/* Image gallery */}
          <ProductImages images={product.images.split(',')} />

          {/* Product info */}
          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {product.name} {product.code}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <div className='flex gap-3 items-center justify-between'>
                <p className='flex text-3xl tracking-tight text-gray-900 text-start'>
                  {product.sellingPrice}&nbsp;
                  <span className='text-base text-red-500  font-bold'>
                    -{product.discount}
                  </span>
                </p>
                <p className='text-base text-black/50 line-through font-bold'>
                  {product.price}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className='mt-3'>
              <h3 className='sr-only'>Reviews</h3>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={cn(
                        6 > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='sr-only'>{5} out of 5 stars</p>
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              {/* <div
                className='space-y-6 text-base text-gray-700'
                dangerouslySetInnerHTML={{ __html: product.description }}
              /> */}
              <pre className='space-y-6 text-base text-gray-700 font-Open_Sans whitespace-pre-wrap'>
                {product.description}
              </pre>
            </div>
            <ProductAttrPicker colorCodes={product.colorCodes.split(',').map(item => ({ name: item, inStock: true }))} />
            <AddToCart product={product} />

            <section aria-labelledby='details-heading' className='mt-12'>
              <h2 id='details-heading' className='sr-only'>
                Additional details
              </h2>

              <div className='divide-y divide-gray-200 border-t'>
                {/* {product.details.map((detail) => (
                  <Disclosure as='div' key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>
                            <span
                              className={cn(
                                open ? 'text-indigo-600' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className='ml-6 flex items-center'>
                              {open ? (
                                <MinusIcon
                                  className='block h-6 w-6 text-indigo-400 group-hover:text-indigo-500'
                                  aria-hidden='true'
                                />
                              ) : (
                                <PlusIcon
                                  className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as='div'
                          className='prose prose-sm pb-6'
                        >
                          <ul role='list'>
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} */}
              </div>
            </section>

          </div>
        </div>
        <Reviews />

      </div>
    </div>
  );
};
export default Product;
