import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

/* PAGES */
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import AdminApproval from "./pages/AdminApproval";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserAnalytics from "./pages/UserAnalytics";
import SellerAnalytics from "./pages/SellerAnalytics";
import AdminManagement from "./pages/AdminManagement";
import Reports from "./pages/Reports";

/* ✅ CHATBOT */
import ChatBot from "./components/ChatBot";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<AuthPage setIsAuth={setIsAuth} />} />

        {/* USER */}
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/user-analytics"
          element={isAuth ? <UserAnalytics /> : <Navigate to="/" />}
        />

        {/* SELLER */}
        <Route
          path="/seller-dashboard"
          element={isAuth ? <SellerDashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/seller-analytics"
          element={isAuth ? <SellerAnalytics /> : <Navigate to="/" />}
        />

        <Route
          path="/add-product"
          element={isAuth ? <AddProduct /> : <Navigate to="/" />}
        />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={isAuth ? <AdminDashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/admin-approval"
          element={isAuth ? <AdminApproval /> : <Navigate to="/" />}
        />
        <Route path="/admin-management" element={<AdminManagement />} />
       
<Route path="/reports" element={<Reports />} />
        {/* ADMIN ANALYTICS */}
        <Route
          path="/admin-analytics"
          element={
            isAuth ? (
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                📊 Admin Analytics (Coming Soon)
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* REPORTS */}
        <Route
          path="/reports"
          element={
            isAuth ? (
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                📄 Reports Page (Coming Soon)
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* COMMON */}
        <Route
          path="/products"
          element={isAuth ? <ProductList /> : <Navigate to="/" />}
        />

        <Route
          path="/products/:id"
          element={isAuth ? <ProductDetail /> : <Navigate to="/" />}
        />

        <Route
          path="/cart"
          element={isAuth ? <Cart /> : <Navigate to="/" />}
        />

        <Route
          path="/checkout"
          element={isAuth ? <Checkout /> : <Navigate to="/" />}
        />
        <Route path="/admin-management" element={<AdminManagement />} />

      </Routes>

      {/* ✅ CHATBOT (VISIBLE ON ALL PAGES) */}
      <ChatBot />

    </BrowserRouter>
  );
}

export default App;