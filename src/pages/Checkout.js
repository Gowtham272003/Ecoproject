import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CART_API, ORDER_API } from "../api/productApi";

function Checkout() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  /* ================= LOAD CART ================= */
  const loadCart = useCallback(() => {
    if (!userId) return;

    CART_API.get(`/${userId}`)
      .then((res) => setCart(res.data || []))
      .catch(() => setCart([]));
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  /* ================= PLACE ORDER ================= */
  const placeOrder = () => {
    const totalPrice = cart.reduce(
      (s, i) => s + i.price * i.quantity,
      0
    );
    const totalCarbon = cart.reduce(
      (s, i) => s + i.carbonImpact * i.quantity,
      0
    );

    const summary = {
      id: Math.floor(Math.random() * 10000),
      date: new Date().toLocaleString(),
      items: cart.map((c) => ({
        name: c.productName,
        price: c.price * c.quantity,
        carbon: c.carbonImpact * c.quantity,
      })),
      totalPrice,
      totalCarbon,
    };

    ORDER_API.post("/checkout", { userId })
      .then(() => {
        setOrderSummary(summary);
        setOrderPlaced(true);
      })
      .catch(() => alert("Order failed"));
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  /* ================= SUCCESS VIEW ================= */
  if (orderPlaced && orderSummary) {
    return (
      <div style={page}>
        <div style={successCard}>
          <h2 style={{ color: "#2e7d32" }}>✅ Order Placed Successfully!</h2>

          <p><b>Order ID:</b> #{orderSummary.id}</p>
          <p><b>Date:</b> {orderSummary.date}</p>

          <hr />

          <h3>🛒 Items Purchased</h3>

          {orderSummary.items.map((item, i) => (
            <div key={i} style={row}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <span>🌍 {item.carbon} CO₂</span>
            </div>
          ))}

          <hr />

          <p><b>Total Bill:</b> ₹{orderSummary.totalPrice.toFixed(2)}</p>
          <p>
            <b>Total Carbon Impact:</b>{" "}
            <span style={{ color: "green" }}>
              🌍 {orderSummary.totalCarbon.toFixed(2)} CO₂
            </span>
          </p>

          <div style={eco}>
            🌱 <b>Thank you for shopping sustainably!</b>
          </div>

          {/* 🔒 LOGOUT BUTTON (BOTTOM) */}
          <button onClick={logout} style={logoutBtn}>
            🔒 Logout
          </button>
        </div>
      </div>
    );
  }

  /* ================= CHECKOUT VIEW ================= */
  return (
    <div style={{ padding: "30px" }}>
      <h2>💳 Checkout</h2>

      {cart.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          {cart.map((c) => (
            <div key={c.productId} style={cardStyle}>
              <p><b>{c.productName}</b></p>
              <p>Qty: {c.quantity}</p>
              <p>Price: ₹{c.price * c.quantity}</p>
              <p>🌱 CO₂: {c.carbonImpact * c.quantity} kg</p>
            </div>
          ))}

          <button onClick={placeOrder} style={orderBtn}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "#e8fdf0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const successCard = {
  background: "#f0fff4",
  padding: "30px",
  borderRadius: "16px",
  width: "650px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
};

const eco = {
  background: "#e8f5e9",
  padding: "12px",
  borderRadius: "8px",
  marginTop: "10px",
  color: "#1b5e20",
};

const cardStyle = {
  border: "1px solid #ddd",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
};

const orderBtn = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "15px",
};

const logoutBtn = {
  background: "#d32f2f",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "25px",
  width: "100%",
  fontSize: "16px",
};