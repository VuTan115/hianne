import { Product } from '@/interfaces/product';
import { getSheetData } from '@/lib/sheet';
import Products from '../components/products';
export const revalidate = 1;
const fetchProducts = async (): Promise<Product[]> => {
  const data = (await getSheetData('lipstick')) as any as Product[];
  return data;
};
const page = async () => {
  const products = await fetchProducts();
  return (
    <>
      <Products title='Son' products={products} />
    </>
  );
};

export default page;
