import { Layout } from "./ui/layout";
import { List } from "./ui/list";
import { CopyRight } from "./ui/copyright";
import { useElements } from "./hooks/use-elements";

export default function Footer() {
  const LIST_ELEMENTS = useElements();
  return (
    <Layout
      list={<List LIST_ELEMENTS={LIST_ELEMENTS} />}
      copyright={<CopyRight />}
    />
  );
}
