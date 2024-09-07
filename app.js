const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const http = require("http");
const server = http.createServer(app);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Middleware
app.use(express.json());

// Routes
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to NoteMate API");
});

// Server setup
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
