const express = require("express");
const mongoose = require("mongoose");
const managerRouter = require("./routes/managerRoutes.js");

const app = express();

app.use(express.static("public"));
app.use(express.json());

var connectionString = "mongodb://localhost:27017/info";
//koji:i3ff9A7zEQey9pJc@crud-test.uqlj0.mongodb.net/info?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database conencted:", connectionString);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

app.set("view engine", "ejs");

app.use(managerRouter);

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

app.get("/", function (req, res) {
  res.render("manager.ejs", {});
});

app.get("/login", function (req, res) {
  res.render("login.ejs", {});
});

app.get("/employee", function (req, res) {
  res.render("employee.ejs", {});
});
