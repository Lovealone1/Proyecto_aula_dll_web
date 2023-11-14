var express = require('express')
var ventasController = require('../controllers/ventasController');
var api = express.Router();
var authenticate = require('../middlewares/authenticate');

api.get('/obtener_ventas_admin/:inicio/:hasta',authenticate.decodeToken,ventasController.obtener_ventas_admin);
api.get('/obtener_detalles_venta_admin/:id',authenticate.decodeToken,ventasController.obtener_detalles_venta_admin);

module.exports = api