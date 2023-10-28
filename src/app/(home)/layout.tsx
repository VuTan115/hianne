import Footer from "./components/footer";

type Props = {
  main: React.ReactNode;
  products: React.ReactNode;
};
const layout = (props: Props) => {
  return (
    <div>
      {props.main}
      {props.products}
      <Footer />
    </div>
  );
};

export default layout;
