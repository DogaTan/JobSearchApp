import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1",
});

API.interceptors.request.use((req) => {
  // Register endpoint'ine giderken token ekleme
  if (
    req.url.includes("/auth/register") ||
    req.url.includes("/auth/company-register")
  ) {
    return req;
  }

  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
