import React, { useEffect, useState } from "react";
import PRODUCT_API from "../api/productApi";

function AddProduct() {
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    carbonImpact: "",
  });

  // ✅ Load products when role changes
  useEffect(() => {
    if (role === "SELLER") {
      loadProducts();
    }
  }, [role]);

  const loadProducts = () => {
    PRODUCT_API.get("/seller/my-products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  };

  const handleSubmit = () => {
    if (!product.name || !product.price) {
      alert("Name and Price are required");
      return;
    }

    if (editingId) {
      PRODUCT_API.put(`/${editingId}`, product)
        .then(() => {
          alert("Product Updated");
          resetForm();
          loadProducts();
        })
        .catch(() => alert("Update failed"));
    } else {
      PRODUCT_API.post("", product)
        .then(() => {
          alert("Product Added");
          resetForm();
          loadProducts();
        })
        .catch((err) =>
          alert(err.response?.data || "Error adding product")
        );
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setProduct({
      name: p.name,
      description: p.description,
      price: p.price,
      carbonImpact: p.carbonImpact,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;

    PRODUCT_API.delete(`/${id}`)
      .then(() => {
        alert("Product Deleted");
        loadProducts();
      })
      .catch(() => alert("Delete failed"));
  };

  const resetForm = () => {
    setEditingId(null);
    setProduct({
      name: "",
      description: "",
      price: "",
      carbonImpact: "",
    });
  };

  if (role !== "SELLER") {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "crimson" }}>
          ❌ Access Denied: Only Sellers Can Manage Products
        </h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px", color: "#2e7d32" }}>
        📦 Manage Products
      </h2>

      {/* FORM */}
      <div style={formStyle}>
        <h3>{editingId ? "✏ Edit Product" : "➕ Add Product"}</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          style={{ ...inputStyle, height: "80px" }}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Carbon Impact (CO₂/kg)"
          value={product.carbonImpact}
          onChange={(e) =>
            setProduct({
              ...product,
              carbonImpact: e.target.value,
            })
          }
          style={inputStyle}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit} style={saveBtn}>
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button onClick={resetForm} style={cancelBtn}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>
        🛒 My Products
      </h3>

      <div style={gridStyle}>
        {products.map((p) => (
          <div key={p.id} style={cardStyle}>
            <h4>{p.name}</h4>
            <p style={{ color: "#555" }}>{p.description}</p>
            <p><strong>₹{p.price}</strong></p>
            <p style={{ fontSize: "13px", color: "#666" }}>
              CO₂: {p.carbonImpact} kg
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => startEdit(p)}
                style={editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const formStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  maxWidth: "450px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const saveBtn = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

const cancelBtn = {
  background: "#888",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
};

const editBtn = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  marginRight: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "crimson",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AddProduct;