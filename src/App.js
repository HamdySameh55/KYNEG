// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";     // ← جديد: السلة
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";                 // صفحة كل المنتجات
import ProductDetails from "./pages/ProductDetails";   // صفحة تفاصيل المنتج
import Cart from "./pages/Cart";                        // ← جديد: صفحة السلة
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <CartProvider>          {/* ← كل الموقع بقى داخل السلة */}
      <Router>
        <Navbar />          {/* فيه أيقونة السلة والعدد دلوقتي */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />           {/* ← صفحة السلة الجديدة */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />   {/* 404 */}
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;