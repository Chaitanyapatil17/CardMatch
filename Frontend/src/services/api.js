import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Add JWT token automatically
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});

// Recommendation API
export const recommendCards = (userData) =>
  API.post("/recommend", userData);

// ✅ NEW: Get card details API
export const getCardDetails = (id) =>
  API.get(`/cards/${id}`);

// Get all cards
export const getAllCards = () =>
  API.get("/cards");

export const addFavorite = (cardId) =>
  API.post("/favorites", { cardId });

export const removeFavorite = (cardId) =>
  API.delete(`/favorites/${cardId}`);

export const getFavorites = () =>
  API.get("/favorites");

export default API;