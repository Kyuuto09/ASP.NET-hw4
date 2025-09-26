import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../src/api/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("Fetching products...");
        const data = await fetchProducts({ pageNumber: 1, pageSize: 20 });
        console.log("Products received:", data);
        setProducts(data.items || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 p-10 min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 p-10 min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 
                    bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      {products.length > 0 ? (
        products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            style={{ animationDelay: `${idx * 100}ms` }}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-20">
          <p className="text-xl text-gray-600">No products found</p>
        </div>
      )}
    </div>
  );
}
