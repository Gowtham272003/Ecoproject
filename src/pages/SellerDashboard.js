import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/seller.jpg"; // reuse existing image

function SellerDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={card}>
        <h1 style={title}>Seller Dashboard</h1>

        <button
          style={{ ...btn, background: "#2e7d32" }}
          onClick={() => navigate("/add-product")}
        >
          ➕ Manage Products
        </button>

        <button
          style={{ ...btn, background: "#6a1b9a" }}
          onClick={() => navigate("/seller-analytics")}
        >
          📊 Seller Analytics
        </button>
      </div>
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,0.95)",
  padding: "50px",
  borderRadius: "16px",
  textAlign: "center",
  width: "420px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
};

const title = {
  marginBottom: "30px",
  fontSize: "28px"
};

const btn = {
  width: "100%",
  padding: "18px",
  marginTop: "20px",
  fontSize: "18px",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

export default SellerDashboard;