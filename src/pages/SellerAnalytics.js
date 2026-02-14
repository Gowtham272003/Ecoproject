import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SellerAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sellerId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!sellerId || !token) {
      setError("Seller not logged in");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8082/api/seller/analytics/summary/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => {
        setStats(data || {});
      })
      .catch(() => {
        setError("No analytics available");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔥 GRAPH ONLY REVENUE & CARBON
  const chartData = {
    labels: ["Total Revenue", "Carbon Saved"],
    datasets: [
      {
        label: "Performance",
        data: [
          stats?.totalRevenue || 0,
          stats?.carbonSaved || 0,
        ],
        backgroundColor: [
          "#2563eb", // Blue - Revenue
          "#16a34a", // Green - Carbon
        ],
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={container}>
      <h1 style={title}>📊 Seller Analytics Dashboard</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && stats && (
        <>
          {/* SUMMARY CARDS */}
          <div style={cardContainer}>
            <StatCard
              title="Total Products"
              value={stats.totalProducts || 0}
              bg="#f59e0b"
            />
            <StatCard
              title="Total Revenue"
              value={`₹ ${stats.totalRevenue || 0}`}
              bg="#2563eb"
            />
            <StatCard
              title="Carbon Saved"
              value={`${stats.carbonSaved || 0} kg`}
              bg="#16a34a"
            />
          </div>

          {/* GRAPH SECTION */}
          <div style={chartWrapper}>
            <Bar data={chartData} options={options} />
          </div>
        </>
      )}
    </div>
  );
}

const StatCard = ({ title, value, bg }) => (
  <div style={{ ...card, background: bg }}>
    <h3>{title}</h3>
    <h2>{value}</h2>
  </div>
);

const container = {
  minHeight: "100vh",
  padding: "40px",
  background: "#f4f6f9",
  textAlign: "center",
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
  marginBottom: "40px",
};

const card = {
  width: "260px",
  height: "140px",
  borderRadius: "16px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const chartWrapper = {
  width: "60%",
  margin: "0 auto",
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

export default SellerAnalytics;