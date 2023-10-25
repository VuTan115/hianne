import { Product } from '@/interfaces/product';
import { cn } from '@/lib/utils';
import { percentToNumber } from '@/utils/number-formater';
import Link from 'next/link';
import CustomImage from './image';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}
const ProductCard = ({ product, className, ...props }: Props) => {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      {/* <img src={product.thumbnail} /> */}
      <div className='relative overflow-hidden rounded-md h-[330px]'>
        <CustomImage
          src={product.thumbnail}
          alt={product.name}
          fill
          className='object-cover transition-all scale-150 hover:scale-[1.6] aspect-[3/4]'
        />
        <div className='sale absolute top-2 left-1 bg-slate-950/50 text-white px-2 rounded-sm font-bold'>
          -{percentToNumber(product.discount)}%
        </div>
      </div>
      <div className=''>
        <Link href={`products/${product.slug}`}>
          <h3 className='font-normal leading-5 text-left two-lines'>
            {product.name}
          </h3>
        </Link>
        <div className='flex  justify-between items-center'>
          <p className='text-base text-black font-bold'>
            {product.sellingPrice}
          </p>
          <p className='text-base text-black/50 line-through font-bold'>
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
