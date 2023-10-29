import { Product } from '@/interfaces/product';
import { getSheetData } from '@/lib/sheet';
import Products from '../components/products';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
export const revalidate = 1;
const sheetsName = [
  { name: 'Son', sheetId: 'lipstick' },
  { name: 'Phấn', sheetId: 'phan' },
  { name: 'Kẻ', sheetId: 'ke' }
];

const page = async () => {
  const allProducts = (await Promise.allSettled(sheetsName.map((item) => getSheetData(item.sheetId)))).map((item, idx) => {
    if (item.status === 'fulfilled') {
      return ({ ...sheetsName[idx], value: item.value })
    }
    return []
  }) as [{ name: string, sheetId: string, value: Product[] }]

  return (
    <>
      {allProducts.map(sheet => {
        return (
          <div key={sheet.sheetId} className='pt-10' id={sheet.sheetId}>
            <ProductTitlle title={sheet.name} query={sheet.sheetId} />
            <Products products={sheet.value} />
          </div>
        );
      })}

    </>
  );
};

const ProductTitlle = ({ title, query }: { title: string, query: string }) => {
  return <div className='flex items-center justify-between container'>
    <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
    <Link href={{ pathname: '/products', query: { category: query } }}>
      <span className='flex gap-2 text-sm flex-nowrap items-center justify-between hover:underline'>
        Xem thêm <ArrowRightIcon />
      </span>
    </Link>
  </div>
}
export default page;
