var express = require('express')
var productoController = require('../controllers/productoController');
var authenticate = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');

var path = multipart({uploadDir: './uploads/productos'});
var api = express.Router();
api.post('/registro_producto_admin',[authenticate.decodeToken,path], productoController.registro_producto_admin);


module.exports = api