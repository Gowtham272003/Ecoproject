import React, { useEffect, useState } from "react";

function Reports() {

  const [summary, setSummary] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      console.error("No token found. Please login as ADMIN.");
      return;
    }

    // ================= SYSTEM SUMMARY =================
    fetch("http://localhost:8082/api/admin/summary", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error(err));

    // ================= LEADERBOARD =================
    fetch("http://localhost:8082/api/reports/leaderboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error(err));

  }, [token]);

  // ================= CSV DOWNLOAD =================
  const downloadCSV = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/reports/csv",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "carbon-report.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>📊 System Sustainability Reports</h1>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <div style={summaryBox}>
          <div style={card}>
            <h3>Total Users</h3>
            <h2>{summary.totalUsers}</h2>
          </div>

          <div style={card}>
            <h3>Total Sellers</h3>
            <h2>{summary.totalSellers}</h2>
          </div>

          <div style={card}>
            <h3>Total Carbon Saved</h3>
            <h2>{Number(summary.totalCarbon).toFixed(2)} kg</h2>
          </div>
        </div>
      )}

      {/* ================= CSV BUTTON ================= */}
      <div style={{ marginBottom: "30px" }}>
        <button style={button} onClick={downloadCSV}>
          Download Full CSV Report
        </button>
      </div>

      {/* ================= LEADERBOARD ================= */}
      <div style={leaderboardBox}>
        <h2>🏆 Green Leaderboard</h2>

        {leaderboard.length === 0 ? (
          <p>No leaderboard data available</p>
        ) : (
          leaderboard.map((user, index) => (
            <div key={index} style={row}>
              <span>
                #{index + 1} User {user.userName}
              </span>

              <span>
                {Number(user.carbonSaved).toFixed(2)} kg
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  padding: "40px",
  background: "#f4f6f9",
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
};

const summaryBox = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  minWidth: "200px",
};

const button = {
  padding: "10px 20px",
  background: "#1b5e20",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const leaderboardBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
};

export default Reports;