import { ScrollArea, ScrollBar } from '@//components/ui/scroll-area';
import { Separator } from '@//components/ui/separator';
import ProductCard from '@/components/product-card';
import { listenNowAlbums } from '../data/albums';

type Props = {
  products: [];
  title: string;
};
const Products = ({ title, products }: Props) => {
  return (
    <section className='container mb-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
      </div>
      <Separator className='my-4' />
      <div className='relative'>
        <ScrollArea>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {listenNowAlbums.map((album, idx) => (
              <ProductCard
                key={album.name}
                product={{
                  id: idx,
                  name: album.name,
                  description: album.artist,
                  thumbnail: album.cover,
                }}
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
