import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/admin.jpg";

function AdminDashboard() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);

  // Hover effect
  const getCardStyle = (index, color) => ({
    ...card,
    background: color,
    transform: hover === index ? "scale(1.05)" : "scale(1)",
    boxShadow:
      hover === index
        ? "0 20px 40px rgba(0,0,0,0.8)"
        : "0 15px 30px rgba(0,0,0,0.5)",
  });

  return (
    <div style={container}>
      <div style={overlay}>
        <h1 style={title}>🛡 Admin Dashboard</h1>

        <div style={cardContainer}>

          {/* APPROVE PRODUCTS */}
          <div
            style={getCardStyle(1, "linear-gradient(135deg, #e53935, #c62828)")}
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(null)}
          >
            <h2>Approve Products</h2>
            <button
              style={btn}
              onClick={() => navigate("/admin-approval")}
            >
              Go
            </button>
          </div>

          {/* SYSTEM REPORTS */}
          <div
            style={getCardStyle(2, "linear-gradient(135deg, #d32f2f, #b71c1c)")}
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(null)}
          >
            <h2>System Reports</h2>
            <button
              style={btn}
              onClick={() => navigate("/reports")}
            >
              View
            </button>
          </div>

          {/* USER MANAGEMENT */}
          <div
            style={getCardStyle(3, "linear-gradient(135deg, #42a5f5, #1565c0)")}
            onMouseEnter={() => setHover(3)}
            onMouseLeave={() => setHover(null)}
          >
            <h2>Manage Users</h2>
            <button
              style={btn}
              onClick={() => navigate("/admin-management")}
            >
              Open
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const overlay = {
  minHeight: "100vh",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "60px",
};

const title = {
  color: "#fff",
  fontSize: "38px",
  marginBottom: "40px",
  fontWeight: "bold",
  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
};

const cardContainer = {
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const card = {
  width: "260px",
  height: "160px",
  borderRadius: "18px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  backdropFilter: "blur(8px)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const btn = {
  marginTop: "12px",
  padding: "8px 18px",
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};

export default AdminDashboard;