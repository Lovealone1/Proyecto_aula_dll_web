var express = require('express')
var publicController = require('../controllers/publicController');
var api = express.Router();

api.get('/obtener_nuevos_productos',publicController.obtener_nuevos_productos);  
api.get('/obtener_productos_recomendados',publicController.obtener_productos_recomendados);
api.get('/obtener_productos_shop',publicController.obtener_productos_shop);
api.get('/listar_categorias_public',publicController.listar_categorias_public);

api.get('/obtener_producto_slug/:slug',publicController.obtener_producto_slug);
api.get('/obtener_producto_categoria/:categoria',publicController.obtener_producto_categoria);
api.get('/obtener_reviews_producto/:id',publicController.obtener_reviews_producto);
module.exports = api