var express = require('express')
var customerController = require('../controllers/customerController');
var api = express.Router();
var authenticate = require('../middlewares/cauthenticate');

api.post('/crear_producto_carrito',authenticate.decodeToken, customerController.crear_producto_carrito);
api.get('/obtener_carrito_cliente',authenticate.decodeToken, customerController.obtener_carrito_cliente);
api.delete('/eliminar_producto_carrito/:id',authenticate.decodeToken, customerController.eliminar_producto_carrito);

api.post('/crear_direccion_cliente',authenticate.decodeToken, customerController.crear_direccion_cliente);
api.get('/obtener_direcciones_cliente',authenticate.decodeToken, customerController.obtener_direcciones_cliente);
api.delete('/eliminar_direcciones_cliente/:id',authenticate.decodeToken, customerController.eliminar_direcciones_cliente);

api.get('/validar_payment_id_venta/:payment_id',authenticate.decodeToken, customerController.validar_payment_id_venta);
api.post('/crear_venta_cliente',authenticate.decodeToken, customerController.crear_venta_cliente);
module.exports = api