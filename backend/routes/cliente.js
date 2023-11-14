var express = require('express')
var clienteController = require('../controllers/clienteController');
var api = express.Router();

api.post('/registro_cliente_ecommerce',clienteController.registro_cliente_ecommerce);
api.post('/login_cliente',clienteController.login_cliente);

module.exports = api