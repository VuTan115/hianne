import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';
import ProductCard from '@/components/product-card';
import { Product } from '@/interfaces/product';
import { getSheetData } from '@/lib/sheet';

type Props = {
  products: [];
  title: string;
  sheetName: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  const sonProducts = (await getSheetData('Son')) as any as Product[];
  return sonProducts;
};

const Products = async ({ title, sheetName }: Props) => {
  const products = await fetchProducts();
  return (
    <section className='container mb-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
      </div>
      <Separator className='my-2' />
      <div className='relative'>
        <ScrollArea>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product) => (
              <ProductCard
                key={`${product.name}-${product.id}`}
                product={product}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </section>
  );
};

export default Products;
