import { Product } from '@/interfaces/product';
import { getSheetData } from '@/lib/sheet';
import Products from '../components/products';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
export const revalidate = 1;

const fetchProducts = async (): Promise<Product[]> => {
  const data = (await getSheetData('lipstick')) as any as Product[];
  return data;
};
const page = async () => {
  const products = await fetchProducts();
  return (
    <>
      <div className="pt-24" id='lipstick'>
        <ProductTitlle title={'Son'} query='son' />
        <Products products={products} />
      </div>

      <div className="pt-24" id='ke' >
        <ProductTitlle title={'Kẻ'} query='ke' />
        <Products products={products} />
      </div>

      <div className="pt-24" id='phan' >
        <ProductTitlle title={'Phấn'} query='phan' />
        <Products products={products} />
      </div>

    </>
  );
};

const ProductTitlle = ({ title, query }: { title: string, query: string }) => {
  return <div className='flex items-center justify-between container'>
    <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
    <Link href={{ pathname: '/products', query: { keyword: 'this way' } }}>
      <span className='flex gap-2 text-sm flex-nowrap items-center justify-between hover:underline'>
        Xem thêm <ArrowRightIcon />
      </span>
    </Link>
  </div>
}
export default page;
