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

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// card routes
app.use("/api/cards", cardRoutes);

// recommendRoutes
app.use("/api/recommend", recommendRoutes);

// historyRoutes
app.use("/api/history", historyRoutes);

// authRoutes
app.use("/api/auth", authRoutes);

// favoriteRoutes
app.use("/api/favorites", favoriteRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});