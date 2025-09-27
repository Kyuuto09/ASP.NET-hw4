const API_BASE = "https://localhost:7118/api";

export const fetchProducts = async ({ 
  pageNumber = 1, 
  pageSize = 20, 
  categoryId, 
  color, 
  capacity, 
  sortBy, 
  sortOrder = 'asc' 
} = {}) => {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    sortOrder
  });

  if (categoryId) params.append('categoryId', categoryId.toString());
  if (color) params.append('color', color);
  if (capacity) params.append('capacity', capacity);
  if (sortBy) params.append('sortBy', sortBy);
  
  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_BASE}/carts`);
  return await res.json();
};

export const addToCartAPI = async (productId, quantity = 1) => {
  console.log("Sending to API:", { productId, quantity });
  const res = await fetch(`${API_BASE}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      ProductId: productId.toString(), 
      Quantity: quantity 
    }),
  });
  
  console.log("API Response status:", res.status);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  const data = await res.json();
  console.log("API Response data:", data);
  return data;
};

export const removeFromCartAPI = async (cartItemId) => {
  const res = await fetch(`${API_BASE}/carts/${cartItemId}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const clearCartAPI = async () => {
  const res = await fetch(`${API_BASE}/carts`, {
    method: "DELETE",
  });
  return await res.json();
};
