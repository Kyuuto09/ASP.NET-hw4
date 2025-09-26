import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Products from "../pages/Products";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}
