'use client'
import FullWidthButton from '@/components/full-width-button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import useCart from '@/hooks/use-cart';
import { Product } from '@/interfaces/product';
import useCartStore from '@/store/cart';
import { HeartIcon } from '@radix-ui/react-icons';
import { useSearchParams, useRouter } from 'next/navigation';
const AddToCart = ({ product }: { product: Product }) => {
  const params = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    const selectedCode = params.get('code') || product.colorCodes.split(',')[0];
    const quantity = parseInt(params.get('quantity')!) || 1;
    addToCart({
      id: Number(product.id),
      name: product.name,
      code: selectedCode,
      quantity: quantity,
      price: product.sellingPrice,
      thumbnail: product.thumbnail,
      slug: product.slug,
      category: product.category,
    });
    toast({
      variant: 'default',
      title: 'Thành công',
      description: 'Sản phẩm đã được thêm vào giỏ hàng của bạn',
      action: (
        <ToastAction
          altText='Xem giỏ hàng'
          onClick={() => router.push('/cart')}
        >
          Xem giỏ hàng
        </ToastAction>
      ),
    });
  };
  return (
    <div className='mt-6'>
      <div className='sm:flex-col1 mt-10 flex'>
        <FullWidthButton onClick={handleAddToCart} type='button'>
          Thêm vào giỏ hàng
        </FullWidthButton>

        <button
          type='button'
          className='ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
        >
          <HeartIcon className='h-6 w-6 flex-shrink-0' aria-hidden='true' />
          <span className='sr-only'>Thêm vào giỏ hàng</span>
        </button>
      </div>
    </div>
  );
};

export default AddToCart