const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')
const usuario = require('./routes/usuario.route')

// Lendo o arquivo de configuracoes...
const conf = JSON.parse(fs.readFileSync('app.conf'))

// Armazena a chave de encriptacao do Crypto-JS
chave = conf.chaveEncriptacaoSenhaUsuario

// Armazena a chave do JWT
chaveJWT = conf.chaveJWT

// Estabelecendo conexao com o banco de dados
mongoose.connect(conf.dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB'))

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Associa a URI a rota
app.use('/usuario', usuario)

app.listen(80, () => {
    console.log('Aplicação em execução.')
})