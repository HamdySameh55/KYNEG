// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// All products data (12 items)
const allProducts = [
  { id: 1, name: "Classic Sneakers", price: "1,299 EGP", originalPrice: "1,599 EGP", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", category: "sneakers", tag: "Best Seller", colors: ["#000","#fff","#8B4513"], sizes: ["38","39","40","41","42"], description: "Premium leather sneakers with ultimate comfort technology. Made with genuine Italian leather and advanced cushioning system for all-day comfort." },
  { id: 2, name: "Premium Boots", price: "1,899 EGP", originalPrice: "2,199 EGP", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800", category: "boots", tag: "New", colors: ["#000","#8B4513","#808080"], sizes: ["39","40","41","42","43"], description: "Durable boots designed for style and long-lasting wear. Waterproof and insulated." },
  { id: 3, name: "Urban Style", price: "1,599 EGP", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800", category: "sneakers", tag: "Trending", colors: ["#fff","#000","#FF0000"], sizes: ["38","39","40","41","42"], description: "Modern urban design with breathable fabric and sleek silhouette." },
  { id: 4, name: "Street Fashion", price: "1,399 EGP", originalPrice: "1,699 EGP", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800", category: "casual", tag: "Hot", colors: ["#000","#fff","#0000FF"], sizes: ["37","38","39","40","41"], description: "Casual street style with unique patterns and bold colors." },
  { id: 5, name: "Luxury Edition", price: "2,199 EGP", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800", category: "luxury", tag: "Limited", colors: ["#000","#fff","#FFD700"], sizes: ["39","40","41","42"], description: "Exclusive luxury collection crafted with premium materials and gold accents." },
  { id: 6, name: "Sport Pro", price: "1,499 EGP", originalPrice: "1,799 EGP", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", category: "sports", tag: "Popular", colors: ["#fff","#000","#FF0000","#0000FF"], sizes: ["38","39","40","41","42","43"], description: "High-performance sports shoes with advanced cushioning and energy return." },
  { id: 7, name: "Minimalist Loafers", price: "1,299 EGP", image: "https://images.unsplash.com/photo-1560769624-6b69c0b67d32?w=800", category: "casual", tag: "Elegant", colors: ["#000","#8B4513","#808080"], sizes: ["39","40","41","42"], description: "Sleek minimalist design perfect for everyday elegance and comfort." },
  { id: 8, name: "Running Elite", price: "1,699 EGP", originalPrice: "1,999 EGP", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800", category: "sports", tag: "Performance", colors: ["#fff","#000","#FF4500"], sizes: ["39","40","41","42","43","44"], description: "Professional running shoes with responsive foam and breathable mesh." },
  { id: 9, name: "Designer Heels", price: "1,899 EGP", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800", category: "luxury", tag: "Elegant", colors: ["#000","#fff","#FF69B4"], sizes: ["36","37","38","39"], description: "Sophisticated high heels designed for special occasions and red carpets." },
  { id: 10, name: "Canvas Classics", price: "999 EGP", originalPrice: "1,299 EGP", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800", category: "casual", tag: "Classic", colors: ["#fff","#000","#008000"], sizes: ["38","39","40","41","42"], description: "Timeless canvas shoes upgraded with modern comfort technology." },
  { id: 11, name: "Winter Boots", price: "2,299 EGP", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800", category: "boots", tag: "Seasonal", colors: ["#000","#8B4513","#808080"], sizes: ["38","39","40","41","42","43"], description: "Warm, waterproof winter boots with fur lining and anti-slip sole." },
  { id: 12, name: "Basketball Pro", price: "1,799 EGP", originalPrice: "2,099 EGP", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800", category: "sports", tag: "Athletic", colors: ["#000","#fff","#FF0000"], sizes: ["40","41","42","43","44","45"], description: "Professional basketball shoes with superior ankle support and grip." }
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const product = allProducts.find(p => p.id === parseInt(id));

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ fontSize: "2.8rem", marginBottom: "20px" }}>Product Not Found</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/product")}
          style={{ padding: "14px 32px", background: "#fff", color: "#000", border: "none", borderRadius: "30px", fontWeight: "bold", fontSize: "1.1rem" }}
        >
          Back to Products
        </motion.button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", padding: "60px 20px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "60px",
          alignItems: "start"
        }}
      >
        {/* Product Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.7)" }}
        >
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        {/* Product Info */}
        <div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            {/* Tag */}
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #fff, #ccc)",
              color: "#000",
              padding: "8px 20px",
              borderRadius: "30px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              marginBottom: "15px",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              {product.tag}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: isMobile ? "2.5rem" : "3.5rem",
              margin: "10px 0 20px",
              background: "linear-gradient(45deg, #fff, #ccc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold"
            }}>
              {product.name}
            </h1>

            {/* Description */}
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "rgba(255,255,255,0.8)", marginBottom: "30px" }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: "35px" }}>
              <span style={{ fontSize: "3rem", fontWeight: "bold" }}>{product.price}</span>
              {product.originalPrice && (
                <span style={{ fontSize: "1.8rem", color: "#999", textDecoration: "line-through", marginLeft: "20px" }}>
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Colors */}
            <div style={{ marginBottom: "35px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "1.4rem", fontWeight: "600" }}>Available Colors</h3>
              <div style={{ display: "flex", gap: "15px" }}>
                {product.colors.map((color, i) => (
                  <div key={i} style={{ width: "55px", height: "55px", backgroundColor: color, borderRadius: "50%", border: "4px solid #333", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "1.4rem", fontWeight: "600" }}>Available Sizes</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {product.sizes.map(size => (
                  <motion.div
                    key={size}
                    whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: "14px 22px", border: "2px solid #fff", borderRadius: "12px", cursor: "pointer", minWidth: "60px", textAlign: "center", fontWeight: "600" }}
                  >
                    {size}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1, padding: "20px", background: "#fff", color: "#000", border: "none", borderRadius: "15px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer" }}
              >
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/product")}
                style={{ padding: "20px 35px", background: "transparent", border: "2px solid #fff", color: "#fff", borderRadius: "15px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem" }}
              >
                Back
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}