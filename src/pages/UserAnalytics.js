import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function UserAnalytics() {
  const [analytics, setAnalytics] = useState([]);
  const [dark, setDark] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    API.get(`/analytics/user/${userId}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];

        const cleaned = data
          .filter(a => a.month != null)
          .map((a, i, arr) => {
            const prev = arr[i - 1]?.carbon || null;
            const change =
              prev !== null
                ? (((a.carbon - prev) / prev) * 100).toFixed(1)
                : null;

            return {
              month: MONTHS[a.month - 1],
              carbon: Number(a.carbon),
              change,
              trend:
                prev === null
                  ? "neutral"
                  : a.carbon > prev
                  ? "up"
                  : "down",
            };
          });

        setAnalytics(cleaned);
      })
      .catch(console.error);
  }, [userId]);

  /* ================= TOTAL CARBON ================= */
  const totalCarbon = analytics.reduce((sum, a) => sum + a.carbon, 0);

  /* ================= BADGE SYSTEM ================= */
  const getBadge = (total) => {
    if (total < 100) return "🥉 Green Beginner";
    if (total < 300) return "🥈 Eco Warrior";
    return "🥇 Planet Protector";
  };

  const badge = getBadge(totalCarbon);

  /* ================= CHART DATA ================= */
  const chartData = {
    labels: analytics.map(a => a.month),
    datasets: [
      {
        label: "Carbon (kg CO₂)",
        data: analytics.map(a => a.carbon),
        backgroundColor: "#4caf50",
        borderColor: "#2e7d32",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
  };

  return (
    <div style={page(dark)}>
      <div style={card(dark)}>
        <div style={header}>
          <h1 style={title(dark)}>🌱 My Carbon Analytics</h1>
          <button style={toggleBtn} onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {analytics.length === 0 ? (
          <p style={empty(dark)}>No analytics data available</p>
        ) : (
          <>
            {/* ===== SUMMARY CARDS ===== */}
            <div style={summaryWrapper}>
              <div style={summaryCard}>
                🌿 Total Carbon Impact <br />
                <strong>{totalCarbon.toFixed(2)} kg CO₂</strong>
              </div>

              <div style={badgeCard(dark)}>
                🏆 Achievement <br />
                <strong>{badge}</strong>
              </div>
            </div>

            {/* ===== TABLE (DESKTOP) ===== */}
            <div className="desktop-table">
              <table style={table(dark)}>
                <thead>
                  <tr>
                    <th style={th}>Month</th>
                    <th style={th}>Carbon (kg CO₂)</th>
                    <th style={th}>Trend</th>
                    <th style={th}>Change %</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.map((a, i) => (
                    <tr key={i}>
                      <td style={td}>{a.month}</td>
                      <td style={td}>{a.carbon.toFixed(2)}</td>
                      <td style={td}>
                        {a.trend === "up" && "🔴 ↑"}
                        {a.trend === "down" && "🟢 ↓"}
                        {a.trend === "neutral" && "—"}
                      </td>
                      <td style={td}>
                        {a.change ? `${a.change}%` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ===== MOBILE CARDS ===== */}
            <div className="mobile-cards">
              {analytics.map((a, i) => (
                <div key={i} style={mobileCard(dark)}>
                  <strong>{a.month}</strong>
                  <div>Carbon: {a.carbon.toFixed(2)} kg</div>
                  <div>
                    Trend:{" "}
                    {a.trend === "up" && "🔴 Increase"}
                    {a.trend === "down" && "🟢 Decrease"}
                    {a.trend === "neutral" && "—"}
                  </div>
                  <div>Change: {a.change ? `${a.change}%` : "—"}</div>
                </div>
              ))}
            </div>

            {/* ===== CHARTS ===== */}
            <div style={charts}>
              <Bar data={chartData} options={chartOptions} />
              <Line data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        .mobile-cards { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none; }
          .mobile-cards { display: block; }
        }
      `}</style>
    </div>
  );
}

export default UserAnalytics;

/* ================= STYLES ================= */

const page = (dark) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: dark
    ? "linear-gradient(135deg, #121212, #1e1e1e)"
    : "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
  padding: "20px",
});

const card = (dark) => ({
  background: dark ? "#1f1f1f" : "#ffffff",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  maxWidth: "1000px",
  width: "100%",
});

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const title = (dark) => ({
  color: dark ? "#a5d6a7" : "#2e7d32",
  fontSize: "28px",
});

const toggleBtn = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const summaryWrapper = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const summaryCard = {
  flex: 1,
  background: "#4caf50",
  color: "white",
  padding: "18px",
  borderRadius: "12px",
  textAlign: "center",
  fontSize: "18px",
};

const badgeCard = (dark) => ({
  flex: 1,
  background: dark ? "#2e7d32" : "#c8e6c9",
  color: dark ? "white" : "#1b5e20",
  padding: "18px",
  borderRadius: "12px",
  textAlign: "center",
  fontSize: "18px",
});

const table = (dark) => ({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "17px",
  marginBottom: "30px",
  color: dark ? "#eee" : "#000",
  tableLayout: "fixed",
});

const th = {
  padding: "14px",
  textAlign: "center",
  fontWeight: "700",
  borderBottom: "2px solid #4caf50",
};

const td = {
  padding: "14px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

const charts = {
  display: "grid",
  gap: "30px",
};

const mobileCard = (dark) => ({
  background: dark ? "#2a2a2a" : "#f9f9f9",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "12px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
});

const empty = (dark) => ({
  textAlign: "center",
  fontSize: "18px",
  color: dark ? "#aaa" : "#666",
});