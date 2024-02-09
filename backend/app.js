const express = require("express");
const bodyParser = require("body-parser");
const config = require('dotenv').config()

const userRoutes = require("./routes/user");
const expensesRoutes = require("./routes/expenses");

const data1 = require("./data/Users.json");
const data2 = require("./data/Labels.json");
const data3 = require("./data/Expenses.json");
console.log(typeof(data1), typeof(data2), typeof(data3));
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

app.use(bodyParser.json());


app.use(userRoutes);
app.use(expensesRoutes);


app.get("/", (req, res)=>{
  res.status(200).json({message: `Hello from the server`})
})


app.use((req, res)=>{
  res.status(404).json({message: "Requested URL not found on the server"});
})

app.use((err, req, res, next) => {
  const message = err.message || "Some Sever Error Occured";
  const statusCode = err.status || 500;
  const data = err.data || [];
  res.status(statusCode).json({ message, data });
});

// app.listen(process.env.PORT);  

module.exports = app;