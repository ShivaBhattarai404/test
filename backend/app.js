const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const expensesRoutes = require("./routes/expenses");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/new", (req, res, next) => {
  res.status(200).json({ msg: "Its a get request from /new" });
});
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expensesRoutes);

app.use((err, req, res, next) => {
  const message = err.message || "Some Sever Error Occured";
  const statusCode = err.status || 500;
  const data = err.data || [];
  res.status(statusCode).json({ message, data });
});

mongoose
  .connect("mongodb://127.0.0.1/expensesTracker")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Connection to the database failed");
  });
