import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // بيانات المنتجات (نفس البيانات الأصلية)
  const allProducts = [
    {
      id: 1,
      name: "Classic Sneakers",
      price: "1,299 EGP",
      originalPrice: "1,599 EGP",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      category: "sneakers",
      tag: "Best Seller",
      colors: ["#000", "#fff", "#8B4513"],
      sizes: ["38", "39", "40", "41", "42"],
      description: "Premium leather sneakers with ultimate comfort technology"
    },
    {
      id: 2,
      name: "Premium Boots",
      price: "1,899 EGP",
      originalPrice: "2,199 EGP",
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600",
      category: "boots",
      tag: "New",
      colors: ["#000", "#8B4513", "#808080"],
      sizes: ["39", "40", "41", "42", "43"],
      description: "Durable boots designed for style and long-lasting wear"
    },
    {
      id: 3,
      name: "Urban Style",
      price: "1,599 EGP",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
      category: "sneakers",
      tag: "Trending",
      colors: ["#fff", "#000", "#FF0000"],
      sizes: ["38", "39", "40", "41", "42"],
      description: "Modern urban design with breathable fabric"
    },
    {
      id: 4,
      name: "Street Fashion",
      price: "1,399 EGP",
      originalPrice: "1,699 EGP",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      category: "casual",
      tag: "Hot",
      colors: ["#000", "#fff", "#0000FF"],
      sizes: ["37", "38", "39", "40", "41"],
      description: "Casual street style with unique patterns"
    },
    {
      id: 5,
      name: "Luxury Edition",
      price: "2,199 EGP",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      category: "luxury",
      tag: "Limited",
      colors: ["#000", "#fff", "#FFD700"],
      sizes: ["39", "40", "41", "42"],
      description: "Exclusive luxury collection with premium materials"
    },
    {
      id: 6,
      name: "Sport Pro",
      price: "1,499 EGP",
      originalPrice: "1,799 EGP",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
      category: "sports",
      tag: "Popular",
      colors: ["#fff", "#000", "#FF0000", "#0000FF"],
      sizes: ["38", "39", "40", "41", "42", "43"],
      description: "High-performance sports shoes with advanced cushioning"
    },
    {
      id: 7,
      name: "Minimalist Loafers",
      price: "1,299 EGP",
      image: "https://images.unsplash.com/photo-1560769624-6b69c0b67d32?w=600",
      category: "casual",
      tag: "Elegant",
      colors: ["#000", "#8B4513", "#808080"],
      sizes: ["39", "40", "41", "42"],
      description: "Sleek minimalist design for everyday elegance"
    },
    {
      id: 8,
      name: "Running Elite",
      price: "1,699 EGP",
      originalPrice: "1,999 EGP",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
      category: "sports",
      tag: "Performance",
      colors: ["#fff", "#000", "#FF4500"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      description: "Professional running shoes with energy return technology"
    },
    {
      id: 9,
      name: "Designer Heels",
      price: "1,899 EGP",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
      category: "luxury",
      tag: "Elegant",
      colors: ["#000", "#fff", "#FF69B4"],
      sizes: ["36", "37", "38", "39"],
      description: "Sophisticated heels for special occasions"
    },
    {
      id: 10,
      name: "Canvas Classics",
      price: "999 EGP",
      originalPrice: "1,299 EGP",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
      category: "casual",
      tag: "Classic",
      colors: ["#fff", "#000", "#008000"],
      sizes: ["38", "39", "40", "41", "42"],
      description: "Timeless canvas shoes with modern comfort"
    },
    {
      id: 11,
      name: "Winter Boots",
      price: "2,299 EGP",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600",
      category: "boots",
      tag: "Seasonal",
      colors: ["#000", "#8B4513", "#808080"],
      sizes: ["38", "39", "40", "41", "42", "43"],
      description: "Warm and waterproof boots for cold weather"
    },
    {
      id: 12,
      name: "Basketball Pro",
      price: "1,799 EGP",
      originalPrice: "2,099 EGP",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
      category: "sports",
      tag: "Athletic",
      colors: ["#000", "#fff", "#FF0000"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      description: "Professional basketball shoes with ankle support"
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "sneakers", name: "Sneakers" },
    { id: "boots", name: "Boots" },
    { id: "sports", name: "Sports" },
    { id: "casual", name: "Casual" },
    { id: "luxury", name: "Luxury" }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = activeFilter === "all" || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Playfair Display', serif",
    overflowX: "hidden",
  };

  // دالة التنقل لصفحة التفاصيل
  const goToProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: isMobile ? "40px 20px" : "80px 20px 40px",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: isMobile ? "3rem" : "4.5rem",
            background: "linear-gradient(45deg, #fff, #ccc, #999)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 3s ease infinite",
            marginBottom: "10px",
          }}
        >
          KYN Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: isMobile ? "1rem" : "1.3rem",
            color: "rgba(255,255,255,0.7)",
            fontStyle: "italic",
            marginBottom: "30px",
          }}
        >
          Discover our complete range of premium footwear
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            maxWidth: "500px",
            margin: "0 auto 40px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 20px",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: "50px",
              color: "#fff",
              outline: "none",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.2 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "40px",
          }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 25px",
                background: activeFilter === category.id
                  ? "linear-gradient(135deg, #fff, #aaa)"
                  : "transparent",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "30px",
                color: activeFilter === category.id ? "#000" : "#fff",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        {filteredProducts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "rgba(20,20,20,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  transition: "all 0.4s ease",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                onClick={() => goToProductDetails(product.id)} // اضغط في أي مكان في الكارد = تفاصيل
              >
                {/* Product Tag */}
                <div style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  background: "linear-gradient(135deg, #fff, #ccc)",
                  color: "#000",
                  padding: "6px 15px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  zIndex: 2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>
                  {product.tag}
                </div>

                {/* Product Image */}
                <div style={{
                  width: "100%",
                  height: isMobile ? "300px" : "380px",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
                  }} />

                  {/* Quick View Button */}
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 3,
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation(); // عشان ميفتحش الصفحة لو ضغطت على الزر بس
                          goToProductDetails(product.id);
                        }}
                        style={{
                          padding: "14px 32px",
                          background: "rgba(255,255,255,0.95)",
                          color: "#000",
                          border: "none",
                          borderRadius: "30px",
                          fontSize: "1rem",
                          fontWeight: "700",
                          cursor: "pointer",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                        }}
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{
                  padding: "25px",
                  position: "relative",
                  zIndex: 1,
                }}>
                  <h3 style={{
                    fontSize: isMobile ? "1.3rem" : "1.5rem",
                    fontWeight: "700",
                    marginBottom: "10px",
                    color: "#fff",
                  }}>
                    {product.name}
                  </h3>

                  <p style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "15px",
                    lineHeight: "1.4",
                    minHeight: "40px",
                  }}>
                    {product.description}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}>
                    <span style={{
                      fontSize: isMobile ? "1.1rem" : "1.3rem",
                      fontWeight: "600",
                      color: "#fff",
                    }}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span style={{
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.5)",
                        textDecoration: "line-through",
                      }}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Color Options */}
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "20px",
                  }}>
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: "2px solid rgba(255,255,255,0.3)",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>

                  {/* Main Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToProductDetails(product.id);
                    }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: "transparent",
                      border: "2px solid #fff",
                      color: "#fff",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    View Details
                  </motion.button>
                </div>

                {/* 3D Shine Effect */}
                <motion.div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                    top: 0,
                    left: "-100%",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                  animate={{
                    left: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Products Found */
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "60px 20px" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#fff" }}>No products found</h3>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px 30px",
                background: "transparent",
                border: "2px solid #fff",
                color: "#fff",
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{ textAlign: "center", padding: "0 20px 60px" }}
      >
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "15px 40px",
            fontSize: "1rem",
            fontWeight: "700",
            background: "transparent",
            border: "3px solid #fff",
            color: "#fff",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          Back to Home
        </motion.button>
      </motion.div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}