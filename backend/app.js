const express = require('express');

const app = express();

app.use((req, res)=>{
    res.send("<h1>Server is running at port 8080</h1>")
})

app.listen(8080);