// src/api/productApi.js
import axios from "axios";

// ================= BASE URL =================
const BASE_URL = "http://localhost:8082/api";

// ================= TOKEN INTERCEPTOR =================
const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// ================= PRODUCT API =================
const PRODUCT_API = axios.create({
  baseURL: `${BASE_URL}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});
PRODUCT_API.interceptors.request.use(attachToken, Promise.reject);

// ================= CART API =================
export const CART_API = axios.create({
  baseURL: `${BASE_URL}/cart`,
  headers: {
    "Content-Type": "application/json",
  },
});
CART_API.interceptors.request.use(attachToken, Promise.reject);

// ================= ORDER API =================
export const ORDER_API = axios.create({
  baseURL: `${BASE_URL}/orders`,
  headers: {
    "Content-Type": "application/json",
  },
});
ORDER_API.interceptors.request.use(attachToken, Promise.reject);

// ================= RECOMMENDATION API =================
export const RECOMMEND_API = axios.create({
  baseURL: `${BASE_URL}/recommendations`,
  headers: {
    "Content-Type": "application/json",
  },
});
RECOMMEND_API.interceptors.request.use(attachToken, Promise.reject);

// ================= ANALYTICS API (🔥 FIXED) =================
export const ANALYTICS_API = axios.create({
  baseURL: `${BASE_URL}/seller/analytics`, // ✅ CORRECT PATH
  headers: {
    "Content-Type": "application/json",
  },
});
ANALYTICS_API.interceptors.request.use(attachToken, Promise.reject);

// ================= DEFAULT EXPORT =================
export default PRODUCT_API;