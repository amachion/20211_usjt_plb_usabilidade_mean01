const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Cliente = require('./models/cliente');

app.use(bodyParser.json());
//app.use(express.json());

mongoose.connect('mongodb+srv://user_base:outrasenha@cluster0.skf8n.mongodb.net/app-mean?retryWrites=true&w=majority')
  .then(() => {
    console.log ("Conexão OK")
  })
  .catch(() => {
    console.log ("Conexão NOK")
  })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,  Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,  OPTIONS');
  next();
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save();
  console.log (cliente);
  res.status(201).json({mensagem: 'Cliente inserido com sucesso'})
});

app.get('/api/clientes', (req, res, next) => {
  cliente.find().then( documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
    });
  });
});

module.exports = app;
