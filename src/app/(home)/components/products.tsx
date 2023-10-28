import { Separator } from '@//components/ui/separator';
import ProductCard from '@/components/product-card';
import { Product } from '@/interfaces/product';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  limit?: number
};

const Products: React.FC<Props> = async (props) => {
  const { products, limit } = props
  const limitedProds = limit ? products.splice(0, limit) : products
  return (
    <section {...props} className={cn('container mb-10', props.className)}>
      <Separator className='my-2' />
      <div className='relative'>
        <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8'>
          {limitedProds.map((product) => (
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
