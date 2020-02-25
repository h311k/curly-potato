const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario.controller')

router.post('/create', controller.create)
router.post('/auth', controller.auth)

module.exports = router