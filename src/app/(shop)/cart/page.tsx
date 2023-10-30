import VietNameProvinceSelector from '@/components/vietnam-province-selector';
import OrderSumary from './components/oder-summary';
import UserInfoForm from './components/user-info-form';
const page = () => {
  return (
    <>
      <section className='mx-auto  w-full px-4 pb-5 rounded-b-md pt-16 sm:px-6 lg:px-8 bg-gray-50 max-w-7xl '>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <h1 className='sr-only'>Checkout</h1>
        </div>

        <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 w-full'>
          <UserInfoForm />
          <OrderSumary />
        </div>
      </section>
    </>
  );
};

export default page;
