import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';
import ProductCard from '@/components/product-card';
import { Product } from '@/interfaces/product';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Props = {
  products: Product[];
  title: string;
};

const Products = async ({ title, products }: Props) => {
  return (
    <section className='container mb-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        <Link href='#'>
          <span className='flex gap-2 text-sm flex-nowrap items-center justify-between hover:underline'>
            Xem thêm <ArrowRightIcon />
          </span>
        </Link>
      </div>
      <Separator className='my-2' />
      <div className='relative'>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8'>
          {products.map((product) => (
            <ProductCard
              key={`${product.name}-${product.id}`}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
