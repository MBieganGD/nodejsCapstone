const express = require("express");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const sequelize = require("./config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", exerciseRoutes);

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
