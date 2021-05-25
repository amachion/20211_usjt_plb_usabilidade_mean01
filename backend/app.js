const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/clientes');

const Cliente = require('./models/cliente');

app.use(bodyParser.json());
//app.use(express.json());

mongoose.connect('mongodb+srv://user_base:outrasenha@cluster0.skf8n.mongodb.net/app-mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  })
  .catch(() => {
    console.log("Conexão NOK")
  })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,  Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/clientes', clienteRoutes);

module.exports = app;
