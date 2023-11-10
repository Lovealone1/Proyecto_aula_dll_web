var express = require('express')
var customerController = require('../controllers/customerController');
var api = express.Router();
var authenticate = require('../middlewares/cauthenticate');

api.post('/crear_producto_carrito',authenticate.decodeToken, customerController.crear_producto_carrito);
api.get('/obtener_carrito_cliente',authenticate.decodeToken, customerController.obtener_carrito_cliente);
api.delete('/eliminar_producto_carrito/:id',authenticate.decodeToken, customerController.eliminar_producto_carrito);
module.exports = api