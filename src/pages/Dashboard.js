import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [hover, setHover] = useState(null);

  const getStyle = (index, color) => ({
    ...styles.btn,
    background: color,
    transform: hover === index ? "translateY(-3px) scale(1.03)" : "scale(1)",
    boxShadow:
      hover === index
        ? "0 6px 20px rgba(0,0,0,0.4)"
        : "0 3px 10px rgba(0,0,0,0.2)",
  });

  return (
    <div style={styles.page}>
      {/* Glow Background */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      {/* Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>🌿 EcoBazaar</h1>

        <h4 style={styles.subtitle}>
          Carbon Footprint Aware Shopping Assistant
        </h4>

        <p style={styles.desc}>
          Explore eco-friendly products, track carbon footprints, and make
          sustainable shopping choices.
        </p>

        <div style={styles.buttons}>
          <button
            style={getStyle(1, "#27ae60")}
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/products")}
          >
            🌿 Product Catalog
          </button>

          <button
            style={getStyle(2, "#2980b9")}
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/cart")}
          >
            🛒 View Cart
          </button>

          <button
            style={getStyle(3, "#8e44ad")}
            onMouseEnter={() => setHover(3)}
            onMouseLeave={() => setHover(null)}
            onClick={() => navigate("/user-analytics")}
          >
            🌱 Carbon Report
          </button>

          {/* SELLER */}
          {role === "SELLER" && (
            <button
              style={getStyle(4, "#f39c12")}
              onMouseEnter={() => setHover(4)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate("/add-product")}
            >
              ➕ Add Product
            </button>
          )}

          {/* ADMIN */}
          {role === "ADMIN" && (
            <button
              style={getStyle(5, "#c0392b")}
              onMouseEnter={() => setHover(5)}
              onMouseLeave={() => setHover(null)}
              onClick={() => navigate("/admin-approval")}
            >
              ✅ Approve Products
            </button>
            
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    position: "relative",
    overflow: "hidden",
  },

  /* Glow Background */
  bgCircle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#27ae60",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-50px",
    left: "-50px",
  },

  bgCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#2980b9",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-50px",
    right: "-50px",
  },

  card: {
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "40px",
    borderRadius: "20px",
    width: "380px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    zIndex: 1,
  },

  title: {
    fontSize: "30px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#a5d6a7",
    marginBottom: "15px",
  },

  desc: {
    fontSize: "13px",
    marginBottom: "25px",
    color: "#ddd",
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  btn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default Dashboard;