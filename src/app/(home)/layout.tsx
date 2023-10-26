type Props = {
  main: React.ReactNode;
  products: React.ReactNode;
};
const layout = (props: Props) => {
  return (
    <div>
      {props.main}

      <div>{props.products}</div>
    </div>
  );
};

export default layout;
