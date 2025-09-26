import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchCategories } from "../src/api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: "", color: "", capacity: "", sortBy: "", sortOrder: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories
  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data.items || []);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      });
  }, []);

  // Fetch products
  useEffect(() => {
    fetchProducts({ 
      pageNumber: page, 
      pageSize, 
      categoryId: filters.categoryId || undefined,
      color: filters.color || undefined,
      capacity: filters.capacity || undefined,
      sortBy: filters.sortBy || undefined,
      sortOrder: filters.sortOrder 
    }).then(data => {
      setProducts(data.items || []);
      setTotalPages(data.totalPages || 1);
    }).catch(err => {
      console.error("Failed to fetch products:", err);
      setProducts([]);
      setTotalPages(1);
    });
  }, [filters, page, pageSize]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1); // reset page when filter changes
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split("-");
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
  };

  return (
    <div className="pt-24 p-10 bg-gradient-to-b from-blue-50 via-white to-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select name="categoryId" value={filters.categoryId} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <input type="text" name="color" placeholder="Color" value={filters.color} onChange={handleFilterChange} className="p-2 border rounded" />
        <input type="text" name="capacity" placeholder="Capacity" value={filters.capacity} onChange={handleFilterChange} className="p-2 border rounded" />

        <select value={`${filters.sortBy}-${filters.sortOrder}`} onChange={handleSortChange} className="p-2 border rounded">
          <option value="-asc">Default</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
        </select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length ? products.map((product, idx) => (
          <ProductCard key={product.id} product={product} style={{ animationDelay: `${idx * 100}ms` }} />
        )) : <p>No products found.</p>}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="px-3 py-1 border rounded">{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
