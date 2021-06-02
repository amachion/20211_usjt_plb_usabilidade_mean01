const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const Usuario = require ('../models/usuario');

router.post('/signup', (req, res, next) => {
  bcrypt.hash (req.body.password, 10).then(hash => {
    const usuario = new Usuario ({
      email: req.body.email,
      password: hash
    })
    usuario.save()
      .then(result => {
        res.status(201).json({
          mensagem: "Usuario criado",
          resultado: result
        });
      })
      .catch(err => {
        res.status(500).json({
        erro: err
      })
    })
  })
});

module.exports = router;
