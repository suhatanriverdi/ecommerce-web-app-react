import { useAtom } from "jotai";
import { shoppingCartAtom, ItemOrder } from "../atoms/shoppingCartAtom.tsx";
import { cartSizeAtom } from "../atoms/cartSizeAtom.tsx";

const useShoppingCart = () => {
  const [cart, setCart] = useAtom(shoppingCartAtom);
  const [cartSize, setCartSize] = useAtom(cartSizeAtom);

  const getCartSize = () => {
    return cartSize;
  };

  const handleCartSize = (amount: number) => {
    setCartSize((prev) => prev + amount);
  };

  const getOldAmountOfItemOrder = (
    itemOrderId: number,
    itemOrderSize: string,
  ) => {
    if (!cart.has(itemOrderId)) {
      return 0;
    }

    if (!cart.get(itemOrderId)!.has(itemOrderSize)) {
      return 0;
    }

    return cart.get(itemOrderId)!.get(itemOrderSize)!.amount;
  };

  const addToCart = (itemOrder: ItemOrder) => {
    setCart((prevCartsMap) => {
      // Deep copy the old map into new one
      const newCartsMap = structuredClone(prevCartsMap);

      // console.log("Previous State: ", prevCartsMap);

      // If the item already exists, increment the amount
      const itemOrderId = itemOrder.id;
      const itemOrderSize = itemOrder.size;
      const itemOrderAmount = itemOrder.amount;
      const oldAmount = getOldAmountOfItemOrder(itemOrderId, itemOrderSize);

      const newAmount = itemOrderAmount + oldAmount;
      const singlePrice = itemOrder.singleItemPrice;

      const updatedOrder: ItemOrder = {
        ...itemOrder,
        amount: newAmount,
        totalCost: singlePrice * newAmount,
      };

      // Create a new map if not exist
      if (!newCartsMap.has(itemOrderId)) {
        newCartsMap.set(itemOrderId, new Map<string, ItemOrder>());
      }

      // Insert the new updatedOrder
      newCartsMap.get(itemOrderId)!.set(itemOrderSize, updatedOrder);

      // Increment Cart Size
      handleCartSize(itemOrderAmount);

      // for (const [key, value] of newCartsMap.entries()) {
      //   console.log("key: ", key, "value: ", value);
      // }

      // console.log("Updated State: ", newCartsMap);
      return newCartsMap;
    });
  };

  const removeFromCart = (itemOrderId: number) => {
    setCart((prevCartsMap) => {
      // Deep copy
      const newCartsMap = structuredClone(prevCartsMap);
      newCartsMap.delete(itemOrderId);

      return newCartsMap;
    });
  };

  return { cart, addToCart, removeFromCart, getCartSize, setCartSize };
};

export default useShoppingCart;
