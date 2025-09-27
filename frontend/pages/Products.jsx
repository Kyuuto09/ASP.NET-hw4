import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchCategories } from "../src/api/api";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../src/hooks/useTheme';

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder, label }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isDarkMode = theme === 'dark';

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="apple-filter-group">
      <label className="apple-filter-label">{label}</label>
      <div className="custom-dropdown" ref={dropdownRef} style={{ position: 'relative', zIndex: 100000 }}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="apple-select"
          style={{
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
            color: isDarkMode ? '#f5f5f7' : '#000000',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <span style={{ 
            fontSize: '12px',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}>▼</span>
        </button>

        {isOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              marginTop: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              zIndex: 99999
            }}
          >
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  color: isDarkMode ? '#f5f5f7' : '#1d1d1f',
                  fontSize: '16px',
                  fontWeight: value === option.value ? '600' : '400',
                  background: value === option.value ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
                  borderBottom: '1px solid ' + (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = value === option.value ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent';
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Products() {
  const { t } = useTranslation();
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



  return (
    <div className="min-h-screen pt-24 apple-glass-bg">
      <div className="max-w-7xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t('products.title')}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        {/* Apple-Style Filter Bar */}
        <div className="apple-glass-card rounded-3xl p-8 mb-12" style={{ position: 'relative', zIndex: 10000 }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Category Filter */}
            <CustomDropdown
              label={t('products.filters.category')}
              placeholder={t('products.filters.allCategories')}
              options={[
                { value: "", label: t('products.filters.allCategories') },
                ...categories.map(c => ({ value: c.id, label: c.name }))
              ]}
              value={filters.categoryId}
              onChange={(value) => setFilters(prev => ({ ...prev, categoryId: value }))}
            />

            {/* Color Filter */}
            <div className="apple-filter-group">
              <label className="apple-filter-label">{t('products.filters.color')}</label>
              <input 
                type="text" 
                name="color" 
                placeholder={t('products.filters.colorPlaceholder')}
                value={filters.color} 
                onChange={handleFilterChange} 
                className="apple-input"
              />
            </div>

            {/* Capacity Filter */}
            <div className="apple-filter-group">
              <label className="apple-filter-label">{t('products.filters.capacity')}</label>
              <input 
                type="text" 
                name="capacity" 
                placeholder={t('products.filters.capacityPlaceholder')}
                value={filters.capacity} 
                onChange={handleFilterChange} 
                className="apple-input"
              />
            </div>

            {/* Sort Options */}
            <CustomDropdown
              label={t('products.filters.sortBy')}
              placeholder={t('products.filters.featured')}
              options={[
                { value: "-asc", label: t('products.filters.featured') },
                { value: "price-asc", label: t('products.filters.priceLowToHigh') },
                { value: "price-desc", label: t('products.filters.priceHighToLow') },
                { value: "name-asc", label: t('products.filters.nameAtoZ') },
                { value: "name-desc", label: t('products.filters.nameZtoA') }
              ]}
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(value) => {
                const [sortBy, sortOrder] = value.split("-");
                setFilters(prev => ({ ...prev, sortBy, sortOrder }));
              }}
            />
          </div>

          {/* Active Filters & Clear Button */}
          {(filters.categoryId || filters.color || filters.capacity || filters.sortBy) && (
            <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {filters.categoryId && (
                    <span className="apple-filter-tag">
                      {t('products.filters.category')}: {categories.find(c => c.id == filters.categoryId)?.name}
                      <button onClick={() => setFilters(prev => ({...prev, categoryId: ''}))}>×</button>
                    </span>
                  )}
                  {filters.color && (
                    <span className="apple-filter-tag">
                      {t('products.filters.color')}: {filters.color}
                      <button onClick={() => setFilters(prev => ({...prev, color: ''}))}>×</button>
                    </span>
                  )}
                  {filters.capacity && (
                    <span className="apple-filter-tag">
                      {t('products.filters.capacity')}: {filters.capacity}
                      <button onClick={() => setFilters(prev => ({...prev, capacity: ''}))}>×</button>
                    </span>
                  )}
                  {filters.sortBy && (
                    <span className="apple-filter-tag">
                      {t('products.filters.sort')}: {filters.sortBy} ({filters.sortOrder})
                      <button onClick={() => setFilters(prev => ({...prev, sortBy: '', sortOrder: 'asc'}))}>×</button>
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setFilters({ categoryId: "", color: "", capacity: "", sortBy: "", sortOrder: "asc" })}
                  className="apple-button-secondary text-sm"
                >
                  {t('products.filters.clearAll')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Count */}
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {products.length === 0 ? t('products.noProductsFound') : 
             t('products.showing', { count: products.length })}
            {totalPages > 1 && ` (${t('products.page')} ${page} ${t('products.of')} ${totalPages})`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                style={{ animationDelay: `${idx * 50}ms` }} 
              />
            ))
          ) : (
            <div className="col-span-full apple-glass-card rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{t('products.noProductsFound')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{t('products.adjustFilters')}</p>
              <button 
                onClick={() => setFilters({ categoryId: "", color: "", capacity: "", sortBy: "", sortOrder: "asc" })}
                className="apple-button-primary"
              >
                {t('products.filters.clearAllFilters')}
              </button>
            </div>
          )}
        </div>

        {/* Apple-Style Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="apple-glass-card rounded-2xl p-4">
              <div className="flex items-center space-x-2">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)} 
                  className="apple-pagination-btn"
                >
                  ← {t('products.previous')}
                </button>
                
                <div className="flex items-center space-x-1 px-4">
                  {Array.from({length: Math.min(totalPages, 5)}, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`apple-page-number ${page === pageNum ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(page + 1)} 
                  className="apple-pagination-btn"
                >
                  {t('products.next')} →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
