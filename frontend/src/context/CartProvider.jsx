// src/context/CartProvider.js
import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { fetchCart, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../api/api";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        console.log("Cart data received:", data);
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      console.log("Adding product to cart:", product);
      await addToCartAPI(product.id, 1);
      console.log("Item added successfully, refreshing cart...");
      
      // Refetch cart to get complete product information
      const refreshedCart = await fetchCart();
      console.log("Refreshed cart data:", refreshedCart);
      setCartItems(refreshedCart.items || []);
      
      // Show success toast
      setToastMessage(`✅ ${product.name} added to cart!`);
      setTimeout(() => setToastMessage(""), 3000);
      
      console.log("Cart updated successfully");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setToastMessage("❌ Failed to add item to cart");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeFromCartAPI(cartItemId);
      // Refetch cart to get complete product information
      const refreshedCart = await fetchCart();
      setCartItems(refreshedCart.items || []);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };


  const clearCart = async () => {
    try {
      await clearCartAPI();
      // Refetch cart to get complete product information
      const refreshedCart = await fetchCart();
      setCartItems(refreshedCart.items || []);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => {
      // Safety check for missing product data
      if (!item.product || typeof item.product.price !== 'number') {
        console.warn("Missing product data for cart item:", item);
        return acc;
      }
      return acc + item.product.price * item.quantity;
    },
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, loading }}>
      {children}
      {/* Apple-style Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 apple-glass-card rounded-2xl p-6 max-w-sm animate-toast-slide-in">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🎉</div>
            <div className="flex-1">
              <p className="font-medium text-black dark:text-white text-base leading-relaxed">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage("")}
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white text-2xl font-light transition-colors duration-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
