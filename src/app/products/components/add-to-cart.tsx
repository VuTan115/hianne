'use client'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import useLocalStorage from "@/hooks/use-local-storage"
import { Product } from "@/interfaces/product"
import { HeartIcon } from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
const AddToCart = ({ product }: { product: Product }) => {
  const params = useSearchParams()
  const { toast } = useToast()

  const [cart, setCart] = useLocalStorage<Product[]>('cart', [])
  return <form className='mt-6' >
    <div className='sm:flex-col1 mt-10 flex'>
      <button
        onClick={() => {
          const selectedCode = params.get('code');
          const updatedProduct = selectedCode ? { ...product, code: selectedCode } : product;
          console.log([...cart])
          console.log([...cart, updatedProduct])
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }}
        type='button'
        className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'
      >
        Thêm vào giỏ hàng
      </button>

      <button
        type='button'
        className='ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
      >
        <HeartIcon
          className='h-6 w-6 flex-shrink-0'
          aria-hidden='true'
        />
        <span className='sr-only'>Thêm vào giỏ hàng</span>
      </button>
    </div>
  </form>
}

export default AddToCart