import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the type for a single cart item
export type CartItem = {
  id: string; // Unique identifier for the item
  name: string; // Name of the product
  price: number; // Price of the product
  quantity: number; // Quantity of the product
};

// Define the shape of the context
export type CartContextType = {
  cart: CartItem[]; // List of items in the cart
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (id: string) => void; // Function to remove an item from the cart
  clearCart: () => void; // Function to clear the cart
};

// Create the context with an initial value of `null`
export const CartContext = createContext<CartContextType | null>(null);

// Provider component to wrap the application or required parts
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item already exists, increment its quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Otherwise, add the new item
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext in components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}