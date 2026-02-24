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

// --- UPDATED CORS CONFIGURATION ---
// This allows your Vercel frontend to talk to this Render backend
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://card-match-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options("*", cors()); // Allow preflight

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/cards", cardRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes); // This handles your Login/Signup
app.use("/api/favorites", favoriteRoutes);

// --- UPDATED PORT FOR PRODUCTION ---
// Render automatically assigns a port; this ensures your app uses it
const PORT = process.env.PORT || 10000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});