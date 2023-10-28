import { SiteHeader } from '@/components/site-header';
import Hero from '../components/hero';
import Categories from '../components/categories';
import Banner from '../components/banner';
import { NavBar } from '../components/test';
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
