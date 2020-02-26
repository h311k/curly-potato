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
        err? next(err) : usuario==null? res.status(500).send('Nome de usuário ou senha inválidos.') : res.send({auth: true, token: jwt.sign({usuario}, chaveJWT, {expiresIn: 300})})
    })
}

let validaJWT = (req, res, next) => {
    let token = req.headers['x-access-token']
    if(!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
    jwt.verify(token, chaveJWT, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        req.usuario = decoded // se o payload tiver mais elementos, como por exemplo perfil, associar aqui tambem.
        next()
    })
}

exports.getUsuario = (req, res, next) => {
    validaJWT(req, res, next)
    return req
}