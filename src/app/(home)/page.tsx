import { SiteHeader } from '@/components/site-header';
import Banner from './components/banner';
import Categories from './components/categories';
import Hero from './components/hero';
import Products from './components/products';
export default async function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Categories />
      <Banner />
      <Products title='Son' products={[]} sheetName='Son' />
    </>
  );
}
