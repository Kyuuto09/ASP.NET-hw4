const API_BASE = "https://localhost:7118/api";

export const fetchProducts = async ({ pageNumber = 1, pageSize = 20 } = {}) => {
  const res = await fetch(`${API_BASE}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
  const res = await fetch(`${API_BASE}/cart`);
  return await res.json();
};

export const addToCartAPI = async (productId, quantity = 1) => {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  return await res.json();
};

export const removeFromCartAPI = async (cartItemId) => {
  const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const clearCartAPI = async () => {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "DELETE",
  });
  return await res.json();
};
