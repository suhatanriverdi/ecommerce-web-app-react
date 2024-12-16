import { useAtom } from "jotai";
import { shoppingCartAtom, ItemOrder } from "../atoms/shoppingCartAtom.tsx";
import { cartSizeAtom } from "../atoms/cartSizeAtom.tsx";
import { replacer, reviver } from "../utils/serializationUtils.ts";

const useShoppingCart = () => {
  const [cart, setCart] = useAtom(shoppingCartAtom);
  const [cartSize, setCartSize] = useAtom(cartSizeAtom);

  const getCartSize = () => {
    return cartSize;
  };

  const handleCartSize = (amount: number) => {
    setCartSize((prev) => prev + amount);
  };

  const restoreCartFromStorage = () => {
    const cartValueString = localStorage.getItem("cart");
    const cartSizeString = localStorage.getItem("cartSize");
    if (cartValueString && cartSizeString) {
      // Cart Value
      const newCartValue = JSON.parse(cartValueString, reviver);
      setCart(newCartValue);
      // Cart Size
      const newCartSize = JSON.parse(cartSizeString, reviver);
      setCartSize(newCartSize);
    }
  };

  const handleLocalStorage = (
    updatedCartsMap: Map<number, Map<string, ItemOrder>>,
    newCardSize: number,
  ) => {
    // Store Cart Information into LocalStorage
    const newCartsMapString = JSON.stringify(updatedCartsMap, replacer);
    localStorage.setItem("cart", newCartsMapString);

    // Store Cart Size into LocalStorage
    localStorage.setItem("cartSize", newCardSize.toString());
  };

  const adjustOrderItemAmount = (
    itemOrderId: number,
    itemOrderSize: string,
    itemOrderPrice: number,
    itemOrderAmount: number,
  ) => {
    setCart((prevCartsMap) => {
      // Deep copy the old map into new one
      const newCartsMap = structuredClone(prevCartsMap);

      // Update the amount
      newCartsMap.get(itemOrderId)!.get(itemOrderSize)!.amount +=
        itemOrderAmount;

      // Update total cost
      newCartsMap.get(itemOrderId)!.get(itemOrderSize)!.totalCost! +=
        itemOrderAmount < 0 ? -itemOrderPrice : itemOrderPrice;

      if (newCartsMap.get(itemOrderId)!.get(itemOrderSize)!.amount === 0) {
        newCartsMap.get(itemOrderId)!.delete(itemOrderSize);
      }

      if (newCartsMap.get(itemOrderId)!.size === 0) {
        newCartsMap.delete(itemOrderId);
      }

      // Sync Local Storage
      const newCartSize = cartSize + itemOrderAmount;

      // Update Cart Size
      setCartSize(newCartSize);

      // Sync local storage
      handleLocalStorage(newCartsMap, newCartSize);

      return newCartsMap;
    });
  };

  const removeFromCart = (
    itemOrderId: number,
    itemOrderSize: string,
    itemOrderAmount: number,
  ) => {
    setCart((prevCartsMap) => {
      // Deep copy the old map into new one
      const newCartsMap = structuredClone(prevCartsMap);

      // Remove the item
      newCartsMap.get(itemOrderId)!.delete(itemOrderSize);
      if (newCartsMap.get(itemOrderId)!.size === 0) {
        newCartsMap.delete(itemOrderId);
      }

      // Sync Local Storage
      const newCartSize = cartSize - itemOrderAmount;

      // Update Cart Size
      setCartSize(newCartSize);

      // Sync local storage
      handleLocalStorage(newCartsMap, newCartSize);

      return newCartsMap;
    });
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

      // Store Cart Information into LocalStorage
      const newCartSize = itemOrderAmount + cartSize;
      handleLocalStorage(newCartsMap, newCartSize);

      return newCartsMap;
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    adjustOrderItemAmount,
    getCartSize,
    setCartSize,
    restoreCartFromStorage,
  };
};

export default useShoppingCart;
