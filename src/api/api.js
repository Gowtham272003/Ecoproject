// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api";

// 🔓 PUBLIC (NO TOKEN) → LOGIN / SIGNUP
export const PUBLIC_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 PRIVATE (WITH TOKEN) → GENERIC PROTECTED CALLS
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;