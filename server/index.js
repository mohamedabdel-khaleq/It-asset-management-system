const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// Middleware
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API is working 🚀",
  });
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/users", userRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(" MongoDB Connection Failed");
    console.log(err.message);
  });

mongoose.connection.on("connected", () => {
  console.log(" Mongoose Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Error:", err.message);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});