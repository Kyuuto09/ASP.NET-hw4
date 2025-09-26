import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useContext(CartContext);

  if (cartItems.length === 0)
    return (
      <div className="pt-24 p-10 text-center text-gray-600">
        Your cart is empty.
      </div>
    );

  return (
    <div className="pt-24 p-10 bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h2 className="font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(idx)}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
        <button
          onClick={clearCart}
          className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
