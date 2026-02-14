import React, { useEffect, useState } from "react";

function AdminManagement() {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [sellerSearch, setSellerSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:8082/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUsers(userData);

        const sellerRes = await fetch("http://localhost:8082/api/admin/sellers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sellerData = await sellerRes.json();
        setSellers(sellerData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  // 🔍 FILTER USERS
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  // 🔍 FILTER SELLERS
  const filteredSellers = sellers.filter((s) =>
    s.username.toLowerCase().includes(sellerSearch.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚙️ Admin Management</h1>

      {/* ================= USERS ================= */}
      <div style={styles.section}>
        <h2>👤 Users</h2>

        <input
          type="text"
          placeholder="🔍 Search users..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.grid}>
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              style={styles.userCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3>{u.username}</h3>
              <p>{u.email || "No Email"}</p>
              <span style={styles.userRole}>{u.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SELLERS ================= */}
      <div style={styles.section}>
        <h2>🏪 Sellers</h2>

        <input
          type="text"
          placeholder="🔍 Search sellers..."
          value={sellerSearch}
          onChange={(e) => setSellerSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.grid}>
          {filteredSellers.map((s) => (
            <div
              key={s.id}
              style={styles.sellerCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3>{s.username}</h3>
              <p>{s.email || "No Email"}</p>
              <span style={styles.sellerRole}>{s.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
    fontFamily: "Segoe UI",
    color: "#fff",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px",
    fontWeight: "bold",
  },

  section: {
    marginBottom: "40px",
  },

  search: {
    padding: "10px",
    width: "260px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "20px",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  /* 👤 USER CARDS */
  userCard: {
    background: "linear-gradient(135deg, #14b8a6, #0f766e)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    transition: "0.3s",
    cursor: "pointer",
  },

  /* 🏪 SELLER CARDS */
  sellerCard: {
    background: "linear-gradient(135deg, #f59e0b, #b45309)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    transition: "0.3s",
    cursor: "pointer",
  },

  userRole: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "8px",
    background: "#065f46",
    fontSize: "12px",
  },

  sellerRole: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "8px",
    background: "#7c2d12",
    fontSize: "12px",
  },
};

export default AdminManagement;