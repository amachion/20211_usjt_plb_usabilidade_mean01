const express = require ('express');
const app = express();

app.use((req, res, next) => {
  console.log("chegando requisições");
  //next();
});

app.use((req, res, next) => {
  res.send("olá, estamos no back");
});

module.exports = app;
