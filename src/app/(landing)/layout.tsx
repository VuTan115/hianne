import Footer from './components/footer';

type Props = {
  products: React.ReactNode;
  children: React.ReactNode;
};
const LandingPage = (props: Props) => {
  return (
    <div>
      {props.children}
      {props.products}
      <Footer />
    </div>
  );
};

export default LandingPage;
