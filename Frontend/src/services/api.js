import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically attach JWT token
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});

// ===============================
// Recommendation API (UPDATED)
// ===============================
export const recommendCards = (userData) =>
  API.post("/recommend/analyze", userData);

// ===============================
// Card APIs
// ===============================
export const getCardDetails = (id) =>
  API.get(`/cards/${id}`);

export const getAllCards = () =>
  API.get("/cards");

// ===============================
// Favorites APIs
// ===============================
export const addFavorite = (cardId) =>
  API.post("/favorites", { cardId });

export const removeFavorite = (cardId) =>
  API.delete(`/favorites/${cardId}`);

export const getFavorites = () =>
  API.get("/favorites");

export default API;