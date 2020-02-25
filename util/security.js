const crypto = require('crypto')

exports.encripta = (senha) => {
    let cipher = crypto.createCipher('aes-128-cbc', chave)
    let senhaEncriptada = cipher.update(senha, 'utf8', 'hex')
    senhaEncriptada += cipher.final('hex')
    return senhaEncriptada
}