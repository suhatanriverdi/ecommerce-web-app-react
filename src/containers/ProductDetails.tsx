import { useAtom } from "jotai/index";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";

export default function Products() {
  const [, setIsProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  const handleCloseProductDetailsWindow = () => {
    setIsProductDetailsWindowOpened(false);
  };

  return (
    <div
      onClick={handleCloseProductDetailsWindow}
      className="flex flex-col justify-center items-center text-lg w-full max-w-[62rem]"
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
        delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
        recusandae. Est et exercitationem facilis libero minima nihil nostrum
        repellendus sit voluptate!
      </div>{" "}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
        delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
        recusandae. Est et exercitationem facilis libero minima nihil nostrum
        repellendus sit voluptate!
      </div>{" "}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
        delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
        recusandae. Est et exercitationem facilis libero minima nihil nostrum
        repellendus sit voluptate!
      </div>{" "}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
        delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
        recusandae. Est et exercitationem facilis libero minima nihil nostrum
        repellendus sit voluptate!
      </div>{" "}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum
        delectus dolore nulla pariatur perferendis reiciendis. Alias, fugit,
        recusandae. Est et exercitationem facilis libero minima nihil nostrum
        repellendus sit voluptate!
      </div>
    </div>
  );
}
