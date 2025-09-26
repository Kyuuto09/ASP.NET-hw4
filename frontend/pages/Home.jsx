import React from "react";
import ProductCard from "../components/ProductCard";

const sampleProducts = [
  { name: "MacBook Pro", price: 1999, image: "https://via.placeholder.com/150" },
  { name: "iPhone 15", price: 1099, image: "https://via.placeholder.com/150" },
  { name: "AirPods Pro", price: 249, image: "https://via.placeholder.com/150" },
  { name: "Apple Watch", price: 399, image: "https://via.placeholder.com/150" },
  { name: "iPad Pro", price: 999, image: "https://via.placeholder.com/150" },
  { name: "Magic Keyboard", price: 199, image: "https://via.placeholder.com/150" },
  { name: "iPhone 15", price: 1099, image: "https://via.placeholder.com/150" },
  { name: "AirPods Pro", price: 249, image: "https://via.placeholder.com/150" },
  { name: "Apple Watch", price: 399, image: "https://via.placeholder.com/150" },
  { name: "iPad Pro", price: 999, image: "https://via.placeholder.com/150" },
  { name: "Magic Keyboard", price: 199, image: "https://via.placeholder.com/150" },
];

export default function Home() {
  return (
    <div className="pt-24 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 
                    bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      {sampleProducts.map((product, idx) => (
        <ProductCard
          key={idx}
          product={product}
          style={{ animationDelay: `${idx * 100}ms` }} // Staggered fade-in
        />
      ))}
    </div>
  );
}
