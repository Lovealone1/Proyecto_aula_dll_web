var express = require('express')
var usuarioController = require('../controllers/usuarioController');
var api = express.Router();

api.post('/registro_usuario_admin',usuarioController.registro_usuario_admin);

module.exports = api