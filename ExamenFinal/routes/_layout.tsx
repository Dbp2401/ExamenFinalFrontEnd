import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

const layout = (props: PageProps) => {
  const Component = props.Component;
  return (
    <div>
      <Header />
      <Component />
    </div>
  );
};
export default layout;
