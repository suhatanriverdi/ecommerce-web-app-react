import { useAtom } from "jotai";
import { selectedProductAtom } from "../atoms/selectedProductAtom.tsx";
import ClodinaryImg from "../components/ClodinaryImg.tsx";
import { useState } from "react";
import CustomButton from "../components/ui/CustomButton.tsx";
import { productAmountAtom } from "../atoms/productAmountAtom.tsx";
import useShoppingCart from "../hooks/useShoppingCart.tsx";
import { ItemOrder } from "../atoms/shoppingCartAtom.tsx";
import { selectedProductSizeAtom } from "../atoms/selectedProductSizeAtom.tsx";

export default function Products() {
  // Shopping Cart Hook
  const { cart, addToCart, removeFromCart } = useShoppingCart();

  cart.forEach((item: ItemOrder) => {
    console.log("item: ", item);
    // console.log(JSON.stringify(item));
  });

  const [selectedProduct] = useAtom(selectedProductAtom);
  const [productAmount, setProductAmount] = useAtom(productAmountAtom);
  const [selectedProductSize, setSelectedProductSize] = useAtom(
    selectedProductSizeAtom,
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleProductAmountChange = (amount: number) => {
    setProductAmount(productAmount + amount <= 0 ? 1 : productAmount + amount);
  };

  const handleProductSizeChange = (size: string) => {
    setSelectedProductSize(size);
  };

  const handleAddToCart = () => {
    const newItemOrder: ItemOrder = {
      product: selectedProduct!,
      amount: productAmount,
      size: selectedProductSize,
    };
    addToCart(newItemOrder);
  };

  // TODO
  // const handleRemoveFromCart = () => {
  //   removeFromCart();
  // };

  const sizeOptions = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className="flex flex-col justify-center items-end max-w-[62rem] text-justify text-pretty w-full">
      {/* Product Details */}
      <div className="shadow-light">
        <div className="gap-[1rem] grid grid-cols-[repeat(auto-fit,minmax(clamp15rem,20%,20rem),1fr))]">
          {/* Product Photo */}
          <div className="p-6">
            <ClodinaryImg
              img_url={selectedProduct!.img_url}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-5 justify-between items-start w-full px-6">
            <p className="font-extrabold">{selectedProduct!.title}</p>

            <p>{selectedProduct!.desc}</p>

            <div>
              <p className="text-sm sm:text-md">Beden</p>
              <div className="flex text-xl sm:text-3xl justify-center items-start">
                {sizeOptions.map((size) => {
                  return (
                    <div
                      onClick={() => handleProductSizeChange(size)}
                      key={size}
                      className={`hover:bg-button-bg-light ${size === selectedProductSize && "bg-button-bg-light"} cursor-pointer px-3`}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm sm:text-md">Adet</p>
              <div className="grid grid-cols-3 items-center justify-items-center gap-3 text-2xl">
                <CustomButton
                  onClick={() => handleProductAmountChange(-1)}
                  w={"2.8"}
                  h={"2.5"}
                  name={"-"}
                />
                <p>{productAmount}</p>
                <CustomButton
                  onClick={() => handleProductAmountChange(+1)}
                  w={"2.8"}
                  h={"2.5"}
                  name={"+"}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-start pb-5">
              <p className="text-sm sm:text-md">Fiyat</p>
              <p className="text-4xl">
                {selectedProduct!.price}{" "}
                <span className="font-extralight">{"₺"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="pt-5">
        <CustomButton
          onClick={() => handleAddToCart()}
          w={"11"}
          h={"3"}
          name={"Sepete Ekle"}
        />
      </div>
    </div>
  );
}
