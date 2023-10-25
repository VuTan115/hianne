import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';
import ProductCard from '@/components/product-card';
import { listenNowAlbums } from '../data/albums';
import { convertToJSON, getSheetData } from '@/lib/sheet';
import { Product } from '@/interfaces/product';

type Props = {
  products: [];
  title: string;
  sheetName: string;
};

const Products = async ({ title, sheetName }: Props) => {
  const products: Product[] = (await getSheetData(
    sheetName
  )) as any as Product[];
  console.log(products);
  return (
    <section className='container mb-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
      </div>
      <Separator className='my-2' />
      <div className='relative'>
        <ScrollArea>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product, idx) => (
              // <span key={product.name}>{product.name}</span>
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </section>
  );
};

export default Products;
