import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";

export default function ProductCard({ product, style }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg animate-fadeIn"
      style={style}
    >
      <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-lg mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
      <p className="text-gray-600 font-medium mb-4">${product.price}</p>
      <button
        className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
