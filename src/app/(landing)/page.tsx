import Banner from './components/banner';
import Categories from './components/categories';
import Hero from './components/hero';
import { SiteHeader } from './components/site-header';
export default async function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Categories />
      <Banner />
    </>
  );
}
export const dynamic = 'force-static';
