import ClodinaryImg from "../components/ClodinaryImg.tsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useShoppingCart from "../hooks/useShoppingCart.tsx";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../components/ui/CloseIcon.tsx";
import { ItemOrder } from "../atoms/shoppingCartAtom.tsx";
import DeleteIcon from "../components/ui/DeleteIcon.tsx";
import { cartSizeAtom } from "../atoms/cartSizeAtom.tsx";
import { useAtom } from "jotai";

export default function ShoppingCart() {
  const navigate = useNavigate();

  // Shopping Cart Hook
  const { cart, removeFromCart, adjustOrderItemAmount } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);
  const [cartSize] = useAtom(cartSizeAtom);
  const [finalCost, setFinalCost] = useState(0);

  const handleProductAmountChange = (
    itemOrderId: number,
    itemOrderSize: string,
    itemOrderPrice: number,
    amount: number,
  ) => {
    adjustOrderItemAmount(itemOrderId, itemOrderSize, itemOrderPrice, amount);

    // Small Animation
    const amountElem = document.getElementById(itemOrderId + itemOrderSize);
    amountElem!.classList.add("animate-bounceUpDown");
    setTimeout(() => {
      amountElem!.classList.remove("animate-bounceUpDown");
    }, 300);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = (
    itemOrderId: number,
    itemOrderSize: string,
    itemOrderAmount: number,
  ) => {
    removeFromCart(itemOrderId, itemOrderSize, itemOrderAmount);
  };

  // TODO Shopping Done!
  const handleShoppingDone = () => {};

  // Initialize Cart Items
  const itemOrders: ItemOrder[] = [];
  let finalCostTotal: number = 0;
  for (const sizesMap of cart.values()) {
    for (const itemOrder of sizesMap.values()) {
      itemOrders.push(itemOrder);
      finalCostTotal += itemOrder.totalCost!;
    }
  }

  // Set Final Cost
  useEffect(() => {
    setFinalCost(finalCostTotal);
  }, [finalCostTotal, cartSize]);

  // console.log(cart, cartSize, finalCostTotal);
  // console.log("itemOrders: ", itemOrders);

  return (
    <AnimatePresence>
      <motion.div
        key={"shopping-cart"}
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 1000, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "anticipate",
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col pt-[40px] tablet:pt-[100px] w-full max-w-[62rem] justify-center items-center text-justify text-pretty mb-[20rem] px-[2rem]">
          {/* NavBar */}
          <div className="sticky backdrop-blur-md bg-white dark:bg-dark dark:bg-opacity-75 bg-opacity-75 py-[1rem] -top-[1px] w-screen flex flex-col items-center justify-center text-justify">
            <div className="flex w-full max-w-[62rem] justify-between items-center tablet:py-[1rem] px-[2rem]">
              <p className="text-lg tablet:text-2xl">{"Sepet"}</p>
              <div
                className="cursor-pointer flex justify-center items-center w-5 tablet:w-7 h-5 tablet:h-7"
                onClick={handleGoBack}
              >
                <CloseIcon />
              </div>
            </div>
          </div>

          {/* No Items in Shopping Cart */}
          {cartSize === 0 && (
            <div className="text-xl tablet:text-2xl pt-[10rem] text-rose-700">
              {"Sepeteniz boş :("}
            </div>
          )}

          {/* Product Details */}
          {cartSize > 0 && (
            <div className="flex flex-col gap-y-[2rem] justify-center items-center w-full mt-[1rem]">
              {itemOrders.map((itemOrder) => {
                return (
                  <div
                    key={itemOrder.id + itemOrder.size}
                    className="flex justify-center items-center w-full shadow-medium"
                  >
                    {/* Product Photo */}
                    <div className="w-full max-w-[7rem] tablet:max-w-[20rem] pr-[1rem] pl-[0.6rem] tablet:pl-[1.5rem] tablet:pr-[2rem]">
                      <ClodinaryImg
                        img_url={itemOrder.img_url}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col tablet:text-xl tablet:px-[0rem] gap-[0.5rem] tablet:gap-[2rem] justify-center items-start w-full h-full py-6 tablet:py-8 tablet:max-h-[24rem]">
                      <div className="flex justify-between w-full items-center pr-[1rem] tablet:pr-[4rem]">
                        <p className="text-left text-wrap tablet:text-2xl w-full max-w-[11rem] tablet:max-w-[34rem]">
                          {itemOrder.name}
                        </p>
                        <div
                          className="cursor-pointer flex justify-center items-center w-6 tablet:w-12 h-6 tablet:h-12"
                          onClick={() =>
                            handleDelete(
                              itemOrder.id,
                              itemOrder.size,
                              itemOrder.amount,
                            )
                          }
                        >
                          <DeleteIcon />
                        </div>
                      </div>

                      {/* Size */}
                      <div className="w-full flex justify-center items-center pr-[1.3rem] tablet:pr-[4rem]">
                        <div>
                          <p className="text-sm tablet:text-lg">Beden</p>
                          <div className="flex w-full justify-between items-center">
                            <div className="flex justify-center items-center">
                              <p className="text-3xl tablet:text-5xl">
                                {itemOrder.size}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col justify-center items-end">
                          <p className="text-sm tablet:text-lg">Tek Adet</p>
                          <p className="tablet:text-3xl">
                            {itemOrder.singleItemPrice} <span>{"₺"}</span>
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="flex justify-between w-full items-center pr-[1.3rem] tablet:pr-[4rem]">
                        <div>
                          <p className="text-sm tablet:text-lg">Adet</p>
                          <div className="flex justify-center items-center gap-3 tablet:gap-4 text-2xl">
                            <div
                              onClick={() =>
                                handleProductAmountChange(
                                  itemOrder.id,
                                  itemOrder.size,
                                  itemOrder.singleItemPrice,
                                  -1,
                                )
                              }
                              className="flex text-3xl justify-center items-center tablet:w-[3rem] w-[1rem] h-[1rem] tablet:h-[3rem] dark:bg-button-bg-dark dark:hover:bg-lime-600 bg-button-bg hover:bg-button-bg-light cursor-pointer p-4"
                            >
                              {"-"}
                            </div>
                            <div className="flex justify-center items-center">
                              <p
                                id={itemOrder.id + itemOrder.size}
                                className="text-3xl w-full tablet:text-4xl text-center"
                              >
                                {itemOrder.amount}
                              </p>
                            </div>
                            <div
                              onClick={() =>
                                handleProductAmountChange(
                                  itemOrder.id,
                                  itemOrder.size,
                                  itemOrder.singleItemPrice,
                                  +1,
                                )
                              }
                              className="flex text-3xl justify-center items-center tablet:w-[3rem] w-[1rem] h-[1rem] tablet:h-[3rem] dark:bg-button-bg-dark dark:hover:bg-lime-600 bg-button-bg hover:bg-button-bg-light cursor-pointer p-4"
                            >
                              {"+"}
                            </div>
                          </div>
                        </div>

                        {/* Cost */}
                        <div className="flex w-full flex-col justify-center items-end">
                          {/*<p className="text-sm tablet:text-lg">Tek Adet</p>*/}
                          {/*<p className="text-2xl tablet:text-3xl">*/}
                          {/*  {itemOrder.singleItemPrice} <span>{"₺"}</span>*/}
                          {/*</p>{" "}*/}
                          <p className="text-sm tablet:text-lg">{"Toplam"}</p>
                          <p className="text-lg tablet:text-4xl">
                            {itemOrder.totalCost} <span>{"₺"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Complete Shopping Cart Button */}
          {cartSize > 0 && (
            <div className="pt-[6rem] tablet:text-xl flex flex-col items-center justify-between w-full">
              <div className="flex justify-between items-center w-full mb-[2rem]">
                <p>{"Toplam Ödenecek: "}</p>
                <p className="text-justify text-4xl tablet:text-6xl text-green-600">
                  {finalCost + " ₺"}
                </p>
              </div>

              {/* Button */}
              <div
                onClick={handleShoppingDone}
                className="flex justify-center tablet:h-[4rem] items-center w-full dark:bg-button-bg-dark dark:hover:bg-lime-600 bg-button-bg hover:bg-button-bg-light cursor-pointer p-3"
              >
                {"Alışverişi Tamamla"}
              </div>
            </div>
          )}
        </div>

        <p className="absolute bottom-10 transform -translate-x-1/2 left-1/2">
          {"GÜLLÜ"}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
