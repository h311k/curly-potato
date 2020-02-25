const security = require('../util/security')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.model')

exports.create = (req,res) => {
    let usuario = new Usuario({
        email: req.body.email,
        nome: req.body.nome,
        senha: security.encripta(req.body.senha),
        dataCriacao: new Date
    })
    usuario.save((err) => {
        if(err) return next(err)
        err? next(err) : res.send('Registo de usuário criado com sucesso')
    })
}

exports.auth = (req,res) => {
    Usuario.findOne({
        'email': req.body.email,
        'senha': security.encripta(req.body.senha),
    },'nome email dataCriacao',
    (err, usuario) => {
        err? next(err) : usuario==null? res.send('Nome de usuário ou senha inválidos.') : res.send({auth: true, token: jwt.sign({usuario}, chaveJWT, {expiresIn: 300})})
    })
}