const express = require('express');

const userRoutes = require("./routes/user");

const app = express();

app.use(userRoutes);

app.listen(8080);