// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // جلب السلة من localStorage عند تحميل التطبيق
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("kyn_cart");   // ← مفتاح موحد بدون شرطة
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  // حفظ السلة في localStorage كل ما تتغير
  useEffect(() => {
    try {
      localStorage.setItem("kyn_cart", JSON.stringify(cart));   // ← نفس المفتاح هنا
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0, 0);

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}