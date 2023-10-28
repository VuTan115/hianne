import Carousel from '@/components/carousel';
import CustomImage from '@/components/image';
import { getSheetData } from '@/lib/sheet';
type BannerProps = {
  image: string;
  alt: string;
};

const getBanner = async (): Promise<BannerProps[]> => {
  const data: BannerProps[] = await getSheetData('banner');
  return data;
};
const Banner: React.FC = async () => {
  const banners = await getBanner();
  return (
    <section id='banner' className='container relative min-h-[200px] md:min-h-[400px] lg:min-w-[600px] w-full my-5'>
      <Carousel autoPlay loop>
        {banners.map((banner, idx) => {
          return (
            <CustomImage
              key={`${banner.alt}-${idx}`}
              src={banner.image}
              priority
              alt={banner.alt}
              fill
              className='object-contain'
            />
          );
        })}
      </Carousel>
    </section>
  );
};

export default Banner;
