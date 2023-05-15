const express = require("express");

const cors = require("cors");
const multer = require("multer");
// const path = require("path");
const user = require("./routes/userRoutes");
const post = require("../src/routes/postRoutes");
const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(multer().any());
// app.use(express.static(path.join(__dirname, "../build")));
// app.use(express.static(path.join(__dirname, "../build")));
app.use("/api/users", user);
app.use("/api/post", post);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server start");
});

// app.get("*", (req, res) => {
//   const file = path.join(__dirname, "../build/index.html");
//   res.sendFile(file);
// });

// app.get("*", (req, res) => {
//   const file = path.join(__dirname, "../build/index.html");
//   res.sendFile(file);
// });
