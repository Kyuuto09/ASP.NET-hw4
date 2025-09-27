import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product, style }) {
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();

  return (
    <div
      className="apple-glass-card rounded-3xl p-8 flex flex-col items-center transition-all duration-500 hover:scale-[1.02] animate-fadeIn"
      style={style}
    >
      <div className="w-full flex justify-center mb-6 apple-product-image">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[220px] w-auto object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center tracking-tight leading-tight">{product.name}</h2>
      <p className="text-gray-900 dark:text-gray-100 font-semibold mb-6 text-2xl">${product.price}</p>
      <button
        className="apple-button-primary w-full"
        onClick={() => addToCart(product)}
      >
        {t('common.addToBag')}
      </button>
    </div>
  );
}
