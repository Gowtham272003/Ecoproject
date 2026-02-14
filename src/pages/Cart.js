import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CART_API, RECOMMEND_API } from "../api/productApi";

function Cart() {
  const [cart, setCart] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  // ✅ READ USER ID SAFELY
  const userId = Number(localStorage.getItem("userId")) || 1;

  // ================= LOAD CART =================
  useEffect(() => {
    CART_API.get(`/${userId}`)
      .then((res) => {
        console.log("CART DATA:", res.data);
        setCart(res.data);
      })
      .catch(() => alert("Failed to load cart"));
  }, [userId]);

  // ================= REMOVE ITEM =================
  const removeItem = (productId) => {
    CART_API.delete(`/remove/${userId}/${productId}`)
      .then(() => {
        setCart((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      })
      .catch(() => alert("Failed to remove item"));
  };

  // ================= TOTALS =================
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCarbon = cart.reduce(
    (sum, item) => sum + item.carbonImpact * item.quantity,
    0
  );

  // ================= GREEN RECOMMENDATIONS =================
  useEffect(() => {
    if (totalCarbon > 0) {
      RECOMMEND_API.get(`/green?carbon=${totalCarbon}`)
        .then((res) => setSuggestions(res.data))
        .catch(() => {});
    }
  }, [totalCarbon]);

  // ================= CHECKOUT =================
  const checkout = () => {
    // ✅ ONLY NAVIGATE — NO ORDER, NO ALERT
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "30px", background: "#f4fdf6", minHeight: "100vh" }}>
      <h2>🛒 Smart Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.productId} style={cardStyle}>
              <h4>{item.productName}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price * item.quantity}</p>
              <p>🌱 CO₂: {item.carbonImpact * item.quantity} kg</p>

              <button
                onClick={() => removeItem(item.productId)}
                style={removeBtn}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <hr />
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
          <h3>Total CO₂: {totalCarbon.toFixed(2)} kg</h3>

          <button onClick={checkout} style={checkoutBtn}>
            ✅ Checkout
          </button>

          {/* 🌿 GREENER ALTERNATIVES */}
          {suggestions.length > 0 && (
            <>
              <hr />
              <h3>🌿 Greener Alternatives</h3>
              {suggestions.map((p) => (
                <div key={p.id} style={greenCard}>
                  <strong>{p.name}</strong>
                  <p>CO₂: {p.carbonImpact} kg</p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "12px",
};

const removeBtn = {
  background: "#d32f2f",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const checkoutBtn = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  marginTop: "15px",
  cursor: "pointer",
};

const greenCard = {
  background: "#e8f5e9",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "8px",
};

export default Cart;