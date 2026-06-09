import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food) => {

    const existingItem = cartItems.find(
      (item) => item.id === food.id
    );

    if (existingItem) {

      setCartItems(
        cartItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);

    }
  };

  const removeItem = (id) => {

    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  const increaseQty = (id) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export default CartProvider;