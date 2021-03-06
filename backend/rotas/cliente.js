const express = require("express");
const router = express.Router();
const Cliente = require('../models/cliente');
const multer = require("multer");
const cliente = require("../models/cliente");

const MIME_TYPE_EXTENSAO_MAPA = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/bmp': 'bmp'
}

const armazenamento = multer.diskStorage({
    destination: (req, file, callback) => {
        let erro = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
            ? null
            : new Error('Mime Type Inválido');
        callback(erro, "backend/imagens")
    },
    filename: (req, file, callback) => {
        const nome = file
            .originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
        callback(null, `${nome}-${Date.now()}.${extensao}`);
    }
})
router.post(
    '',
    multer({storage: armazenamento}).single('imagem'),
    (req, res, next) => {
        const cliente = new Cliente(
            {nome: req.body.nome, fone: req.body.fone, email: req.body.email}
        )
        cliente.save();
        console.log(cliente);
        res
            .status(201)
            .json({mensagem: 'Cliente inserido com sucesso'})
    }
);

router.get('/:id', (req, res, next) => {
    Cliente
        .findById(req.params.id)
        .then(cli => {
            if (cli) {
                res
                    .status(200)
                    .json(cli);
            } else
                res
                    .status(404)
                    .json({mensagem: "Cliente não encontrado!"})
            })
});

router.get('', (req, res, next) => {
    //console.log (req.query);
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    const consulta = Cliente.find(); //só executa quando chamamos then
    let clientesEncontrados;
    if (pageSize && page) {
        consulta
            .skip(pageSize * (page - 1))
            .limit(pageSize);
    }
    consulta.then(documents => {
        clientesEncontrados = documents;
        return Cliente.count();
    })
    .then ((count) => {
      res
        .status(200)
        .json({mensagem: "Tudo OK", clientes: clientesEncontrados, maxClientes: count
      });
    })
});
router.delete('/:id', (req, res, next) => {
    Cliente
        .deleteOne({_id: req.params.id})
        .then((resultado) => {
            console.log(resultado);
            res
                .status(200)
                .json({mensagem: "Cliente removido"})
        });
});

router.put(
    "/:id",
    multer({storage: armazenamento}).single('imagem'),
    (req, res, next) => {
        console.log(req.file);
        let imagemURL = req.body.imagemURL; //tentamos pegar a URL já existente
        if (req.file) { //mas se for um arquivo, montamos uma nova
            const url = req.protocol + "://" + req.get("host");
            imagemURL = url + "/imagens/" + req.file.filename;
        }
        const cliente = new Cliente(
            {_id: req.params.id, nome: req.body.nome, fone: req.body.fone, email: req.body.email, imagemURL: imagemURL}
        );
        Cliente
            .updateOne({
                _id: req.params.id
            }, cliente)
            .then((resultado) => {
                //console.log(resultado)
                res
                    .status(200)
                    .json({mensagem: 'Atualização realizada com sucesso'})
            });
    }
);
module.exports = router;
