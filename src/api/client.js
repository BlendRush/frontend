// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3003/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth:token") || sessionStorage.getItem("auth:token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
