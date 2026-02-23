import axios from "axios";

const API = axios.create({
  /** * FIX: Use environment variables for deployment.
   * On Vercel/Netlify, set VITE_API_URL to your Render backend URL.
   */
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ✅ Automatically attach JWT token for Protected Routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ===============================
// Recommendation & History APIs
// ===============================

// Analyzes user spending to suggest cards
export const recommendCards = (userData) =>
  API.post("/recommend/analyze", userData);

// Fetches the user's past recommendation scans
export const getHistory = () => 
  API.get("/recommend/history"); 

// ===============================
// Card & Comparison APIs
// ===============================

// Fetches details for a single card by ID
export const getCardDetails = (id) =>
  API.get(`/cards/${id}`);

// NEW: Fetches multiple cards for the Comparison Table
export const compareCards = (cardIds) =>
  API.post("/cards/compare", { cardIds }); 

// Fetches all available cards in the database
export const getAllCards = () =>
  API.get("/cards");

// ===============================
// Favorites APIs
// ===============================

// Adds a card to the user's favorites list
export const addFavorite = (cardId) =>
  API.post("/favorites", { cardId });

// Removes a card from the user's favorites list
export const removeFavorite = (cardId) =>
  API.delete(`/favorites/${cardId}`);

// Retrieves all favorite cards for the logged-in user
export const getFavorites = () =>
  API.get("/favorites");

export default API;