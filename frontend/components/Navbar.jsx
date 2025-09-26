import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";


export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center
                    bg-gradient-to-r from-white/10 via-white/20 to-white/10
                    backdrop-blur-[40px] backdrop-saturate-[200%]
                    border border-white/20 shadow-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-gray-900">My E-Shop</h1>
      <div className="flex space-x-4 text-gray-700 font-medium">
        <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
        <a href="/products" className="hover:text-gray-900 transition-colors">Products</a>
        <a href="/cart" className="hover:text-gray-900 transition-colors relative">
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              {cartItems.length}
            </span>
          )}
        </a>
      </div>
      {/* Optional subtle noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
    </nav>
  );
}
