import axios from "axios";

const API = axios.create({
  baseURL: "https://rest-api-fd2n.onrender.com", // change selon ton backend
});

// ajouter le token automatiquement si présent
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
