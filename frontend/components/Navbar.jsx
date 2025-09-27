import React, { useContext } from "react";
import { CartContext } from "../src/context/CartContext";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center apple-navbar-glass overflow-visible">
      <h1 className="text-2xl font-semibold text-black dark:text-white">{t('navigation.brand')}</h1>
      <div className="flex items-center space-x-6">
        <div className="flex space-x-4 text-black dark:text-gray-300 font-medium">
          <a href="/" className="hover:text-blue-600 dark:hover:text-white transition-colors">{t('navigation.home')}</a>
          <a href="/products" className="hover:text-blue-600 dark:hover:text-white transition-colors">{t('navigation.products')}</a>
          <a href="/cart" className="hover:text-blue-600 dark:hover:text-white transition-colors relative">
            {t('navigation.cart')}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {cartItems.length}
              </span>
            )}
          </a>
        </div>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* GitHub Badge */}
        <a 
          href="https://github.com/Kyuuto09" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-badge"
          title="Made by Kyuuto09 💖"
        >
          <span className="github-icon">⚡</span>
          <span className="github-text">Kyuuto09/九</span>
        </a>
      </div>
      {/* Optional subtle noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
    </nav>
  );
}
