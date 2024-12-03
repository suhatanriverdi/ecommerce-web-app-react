import { useAtom } from "jotai";
import { shoppingCartAtom, ItemOrder } from "../atoms/shoppingCartAtom.tsx";

const useShoppingCart = () => {
  const [cart, setCart] = useAtom(shoppingCartAtom);

  const addToCart = (itemOrder: ItemOrder) => {
    setCart((prevCartsMap) => {
      // Deep copy
      const newCartsMap = structuredClone(prevCartsMap);
      const itemOrderId = itemOrder.product.id;

      // If the item already exists, increment the amount
      const prevItemOrder = newCartsMap.get(itemOrderId);
      const prevAmount = prevItemOrder ? prevItemOrder.amount : 0;

      const newAmount = itemOrder.amount + prevAmount;
      const newItemOrder = { ...itemOrder, amount: newAmount };

      newCartsMap.set(itemOrderId, newItemOrder);

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

  return { cart, addToCart, removeFromCart };
};

export default useShoppingCart;
