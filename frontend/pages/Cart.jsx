// src/pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";
import { useTranslation } from 'react-i18next';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice, loading } = useContext(CartContext);
  const { t } = useTranslation();

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center apple-glass-bg">
      <div className="apple-glass-card p-8 rounded-3xl">
        <div className="animate-pulse text-xl text-gray-800 dark:text-white font-medium">{t('cart.loading')}</div>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center apple-glass-bg">
      <div className="apple-glass-card p-12 rounded-3xl text-center max-w-md">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">{t('cart.empty')}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{t('cart.emptyMessage')}</p>
        <a href="/" className="apple-button-primary">
          {t('cart.continueShopping')}
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 apple-glass-bg">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{t('cart.title')}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{t('cart.itemCount', { count: cartItems.length })}</p>
        </div>
        
        <div className="space-y-8">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="cart-item apple-glass-card rounded-3xl p-8 hover:scale-[1.02] transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-8">
                {item.product.image && (
                  <div className="apple-product-image flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-32 h-32 object-contain rounded-2xl"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">{item.product.name}</h2>
                  <div className="flex items-center space-x-6 text-black dark:text-gray-300 mb-4">
                    <span className="apple-badge">
                      {t('cart.qty')} {item.quantity}
                    </span>
                    <span className="text-2xl font-semibold text-black dark:text-white">${item.product.price}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{t('cart.subtotal')}: ${(item.product.price * item.quantity).toFixed(2)}</p>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="apple-button-secondary-small"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total Section */}
        <div className="mt-16 apple-glass-card rounded-3xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">{t('cart.total')}</h2>
            <span className="text-5xl font-bold text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-6">
            <button
              onClick={clearCart}
              className="apple-button-secondary flex-1 text-lg py-4"
            >
              {t('cart.clearBag')}
            </button>
            <button className="apple-button-primary flex-1 text-lg py-4">
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
