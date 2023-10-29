import React from 'react';
import ShopNav from './components/shop-nav';

const layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <ShopNav />
      {props.children}
    </>
  );
};

export default layout;
