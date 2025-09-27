import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeModal from "../components/WelcomeModal";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Products from "../pages/Products";

export default function App() {
  console.log('App component rendering...');
  
  const [showWelcomeModal, setShowWelcomeModal] = React.useState(false);
  
  const handleOpenWelcomeModal = () => {
    setShowWelcomeModal(true);
  };
  
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };
  
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
          <Footer onOpenWelcomeModal={handleOpenWelcomeModal} />
          <WelcomeModal 
            forceShow={showWelcomeModal} 
            onClose={handleCloseWelcomeModal} 
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}
