import React, { useState, useEffect } from "react";
import signature from "../image/sign.png"; // صورة التوقيع
import { FaInstagram, FaTiktok } from "react-icons/fa"; // استيراد الأيقونات

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#000", // خلفية سودا
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    fontFamily: "'Playfair Display', serif",
    backgroundImage: `url(${signature})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain", // الصورة تظهر بالكامل
  };

  const splashStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000", // خلفية سودا
    backgroundImage: `url(${signature})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    zIndex: 999,
    opacity: showSplash ? 1 : 0,
    transition: "opacity 1s ease",
  };

  const contentWrapper = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "30px" : "80px",
    maxWidth: "1300px",
    width: "100%",
    padding: "40px 20px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
    opacity: showSplash ? 0 : 1,
    transition: "opacity 1s ease 0.5s",
  };

  const textBox = {
    flex: 1,
    textAlign: isMobile ? "center" : "left",
  };

  const cards = [
    { src: signature, rotate: -8, y: -20, scale: 0.95 },
    { src: signature, rotate: 4, y: 12, scale: 0.98 },
    { src: signature, rotate: -3, y: 30, scale: 1 },
  ];

  const stackContainer = {
    position: "relative",
    width: isMobile ? "90%" : "420px",
    height: isMobile ? "320px" : "480px",
    margin: "0 auto",
  };

  const baseImg = {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "25px",
    objectFit: "contain", // خلي الصورة تظهر بالكامل
    position: "absolute",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#000", // خلفية سودا للصور الشفافة
    transition: "all 0.5s ease",
  };

  const glowEffect = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "110%",
    height: "110%",
    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
    borderRadius: "30px",
    filter: "blur(20px)",
    opacity: hovered !== null ? 0.6 : 0,
    transition: "opacity 0.3s ease",
    zIndex: 0,
  };

  const iconStyle = {
    fontSize: "30px",
    margin: "0 10px",
    cursor: "pointer",
    transition: "transform 0.3s",
  };

  return (
    <div style={containerStyle}>
      {/* Splash screen full-screen */}
      <div style={splashStyle}></div>

      {/* Content */}
      <div style={contentWrapper}>
        <div style={textBox}>
          <h1
            style={{
              fontSize: isMobile ? "3rem" : "4.5rem",
              background: "linear-gradient(45deg, #000, #fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KYN
          </h1>
          <h2
            style={{
              fontSize: isMobile ? "1rem" : "1.5rem",
              fontStyle: "italic",
              marginBottom: "15px",
            }}
          >
            Your Step, Your Thread, Your Family
          </h2>
          <div
            style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}
          >
            <FaInstagram style={iconStyle} className="social-icon" />
            <FaTiktok style={iconStyle} className="social-icon" />
          </div>
        </div>

        {/* Stacked cards floating */}
        <div style={stackContainer}>
          <div style={glowEffect}></div>
          {cards.map((card, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                animation: `float ${6 + index}s ease-in-out infinite alternate`,
              }}
            >
              <img
                src={card.src}
                alt={`Card ${index}`}
                style={{
                  ...baseImg,
                  transform: `rotate(${card.rotate}deg) translateY(${card.y}px) scale(${card.scale})`,
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }

          .card-hover:hover {
            transform: scale(1.05);
          }

          .social-icon:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
}
