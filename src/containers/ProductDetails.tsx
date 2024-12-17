import { useAtom } from "jotai";
import { selectedProductAtom } from "../atoms/selectedProductAtom.tsx";
import ClodinaryImg from "../components/ClodinaryImg.tsx";
import { useRef, useState } from "react";
import CustomButton from "../components/ui/CustomButton.tsx";
import { productAmountAtom } from "../atoms/productAmountAtom.tsx";
import useShoppingCart from "../hooks/useShoppingCart.tsx";
import { ItemOrder } from "../atoms/shoppingCartAtom.tsx";
import { selectedProductSizeAtom } from "../atoms/selectedProductSizeAtom.tsx";

export default function ProductDetails() {
  // Shopping Cart Hook
  const { addToCart } = useShoppingCart();

  const amountRef = useRef<HTMLParagraphElement | null>(null);

  const [selectedProduct] = useAtom(selectedProductAtom);
  const [productAmount, setProductAmount] = useAtom(productAmountAtom);
  const [selectedProductSize, setSelectedProductSize] = useAtom(
    selectedProductSizeAtom,
  );

  const [isLoading, setIsLoading] = useState(true);

  const handleProductAmountChange = (amount: number) => {
    setProductAmount(productAmount + amount <= 0 ? 1 : productAmount + amount);
    if (amountRef.current) {
      amountRef.current.classList.add("animate-bounceUpDown");
      setTimeout(() => {
        amountRef.current?.classList.remove("animate-bounceUpDown");
      }, 300);
    }
  };

  const handleProductSizeChange = (size: string) => {
    setSelectedProductSize(size);
  };

  const handleAddToCart = () => {
    const newItemOrder: ItemOrder = {
      singleItemPrice: selectedProduct!.price,
      name: selectedProduct!.title,
      id: selectedProduct!.id,
      amount: productAmount,
      size: selectedProductSize,
      img_url: selectedProduct!.img_url,
    };

    addToCart(newItemOrder);
  };

  const sizeOptions = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className="flex flex-col pt-4 justify-center items-end w-full max-w-[62rem] text-justify text-pretty">
      {/* Product Details */}
      <div className="flex flex-col justify-center w-full items-center shadow-light mb-[2rem] tablet:mb-[1rem] pb-[2rem] tablet:pb-[4rem]">
        <div className="flex flex-col justify-items-center items-center px-[2rem]">
          {/* Product Photo */}
          <div className="flex justify-center items-center h-full max-h-[20rem] tablet:max-h-[36rem] w-full tablet:max-w-[32rem] overflow-clip">
            <ClodinaryImg
              img_url={selectedProduct!.img_url}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col tablet:text-xl  tablet:px-[0rem] gap-[2rem] justify-between items-start w-full h-full max-h-[24rem]">
            <p>{selectedProduct!.desc}</p>

            <div className="w-full">
              <p className="text-sm tablet:text-md">Beden</p>
              <div className="flex w-full justify-between items-center">
                {sizeOptions.map((size) => {
                  return (
                    <div
                      onClick={() => handleProductSizeChange(size)}
                      key={size}
                      className={`flex justify-center items-center ${size === selectedProductSize && "bg-button-bg dark:bg-button-bg-dark"} hover:bg-button-bg-light dark:hover:bg-lime-600 w-10 h-10 cursor-pointer`}
                    >
                      <p className="text-2xl text-center">{size}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm tablet:text-md">Adet</p>
              <div className="grid grid-cols-3 items-center justify-items-center gap-3 text-2xl">
                <CustomButton
                  onClick={() => handleProductAmountChange(-1)}
                  w={"3"}
                  h={"2.75"}
                  name={"-"}
                />
                <p ref={amountRef}>{productAmount}</p>
                <CustomButton
                  onClick={() => handleProductAmountChange(+1)}
                  w={"3"}
                  h={"2.75"}
                  name={"+"}
                />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center items-end">
              <p className="text-sm tablet:text-md">Fiyat</p>
              <p className="text-4xl">
                {selectedProduct!.price}{" "}
                <span className="font-extralight">{"₺"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="pt-5 text-lg">
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
