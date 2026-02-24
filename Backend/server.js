const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const cardRoutes = require("./routes/cardRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();
connectDB();

const app = express();

/*
  ✅ CLEAN CORS CONFIG
  - Allows Vercel frontend
  - Allows local dev
  - No app.options("*") (causes crash in Express 5)
*/



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://card-match-frontend.vercel.app/login"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

// Render provides PORT automatically
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});