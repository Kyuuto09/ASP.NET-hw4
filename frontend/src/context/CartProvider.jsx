// src/context/CartProvider.js
import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { fetchCart, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../api/api";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        // Set empty cart on error instead of breaking the app
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const updatedCart = await addToCartAPI(product.id, 1);
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const updatedCart = await removeFromCartAPI(cartItemId);
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      const updatedCart = await clearCartAPI();
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};
