import React from "react";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import Logo from "../image/kyn_logo_transparent.png";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#111",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', serif",
    gap: "10px",
  };

  const socialIcons = {
    display: "flex",
    gap: "15px",
  };

  const logoStyle = {
    height: "50px",
    objectFit: "contain",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
  };

  const sloganStyle = {
    fontSize: "1rem",
    opacity: 0.8,
    textAlign: "center",
  };

  return (
    <footer style={footerStyle}>
      <img src={Logo} alt="KYN Logo" style={logoStyle} />
      <div style={sloganStyle}>Your Step, Your Thread, Your Family</div>
      <div style={socialIcons}>
        <a href="https://www.instagram.com/kyn_eg" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <FaInstagram size={24} />
        </a>
        <a href="https://www.tiktok.com/@kyn_eg" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <FaTiktok size={24} />
        </a>
        <a href="mailto:info@kyn.com" style={linkStyle}>
          <FaEnvelope size={24} />
        </a>
      </div>
      <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>© 2025 KYN. All rights reserved.</div>
    </footer>
  );
}
