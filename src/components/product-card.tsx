import { cn } from '@/lib/utils';
import Image from 'next/image';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    // price: string;
    // slug: string;
    // quantity: string;
    // full_description: string;
  };
}
const ProductCard = ({ product, className, ...props }: Props) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <div className='relative overflow-hidden rounded-md h-[330px]'>
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className='object-cover transition-all scale-150 hover:scale-[1.6] aspect-[3/4]'
        />
        <div className='sale absolute top-2 left-1 bg-slate-950/50 text-white px-2 rounded-sm font-bold'>
          Sale 10%
        </div>
      </div>
      <div className=''>
        <h3 className='font-normal leading-5 text-left one-line'>
          {product.name}
        </h3>
        <div className='flex  justify-between items-center'>
          <p className='text-base text-black font-bold'>
            {product.description}
          </p>
          <p className='text-base text-black/50 line-through font-bold'>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
