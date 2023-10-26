import { getSheetData, getSheets } from '@/lib/sheet';
import Products from '../components/products';
import { Product } from '@/interfaces/product';

const fetchProducts = async (): Promise<Product[]> => {
  const data = (await getSheetData('lipstick')) as any as Product[];
  return data;
};
const page = async () => {
  const products = await fetchProducts();
  // const sheets = await getSheets();
  // console.log(sheets);
  return (
    <>
      <Products title='Son' products={products} />
    </>
  );
};

export default page;
export const dynamic = 'force-dynamic';
